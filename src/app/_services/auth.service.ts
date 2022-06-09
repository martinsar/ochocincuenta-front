import { Injectable, EventEmitter } from '@angular/core';

import { filter, distinctUntilChanged } from 'rxjs/operators';

import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from 'src/app/_models/usuario';
import { Rol } from '../_models/rol';



@Injectable({
	providedIn: 'root',
})
export class AuthService {
	//public currentUser: Observable<Usuario>;
	public currentUser: Observable<any>;
	public cambiarDeEstadoSesionDeUsuario = new EventEmitter();
	private currentUserSubject: BehaviorSubject<any>;

	constructor() { 
		this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')!));
		this.currentUser = this.currentUserSubject.asObservable();
		
	  }


	public get currentUserValue(): Usuario {
		return this.currentUserSubject.value;
	}
	
	nuevoUsuario(user: Usuario) {
	  localStorage.setItem('token', user.token!);
	  localStorage.setItem('currentUser', JSON.stringify(user));
	  this.currentUserSubject.next(user);
	}
	
	emitirCambiarEstadoDeSesion(sesion:any) {
	  this.cambiarDeEstadoSesionDeUsuario.emit(sesion);
	}
	isAuthenticated() : boolean{
		return true;
	}

	contieneRol(rolesComponent:Array<String>,rolUser:Rol){
		let resultado: boolean = false;
		console.log("descripcion ",rolUser)
		rolesComponent.forEach(function(rolPos) {
			if(rolPos == rolUser.descripcion){
				resultado = true;
			}
			
		  }, this);
		  return resultado;
	}



	getTieneRolForArray(roles:Array<String>){
		
		const user = this.currentUserSubject.value;
		let resultado: boolean = false; 
		for(var i = 0; i <  user.roles!.length; i++){
			resultado = this.contieneRol(roles,user.roles![i]);
		}
		return resultado	
	}

	getTienePermisoPorDescripcion(roles:Array<String>){
		const user = this.currentUserSubject.value;
		let resultado: boolean = false; 
		for(var i = 0; i <  user.roles!.length; i++){
			resultado = this.contieneRolPorDescripcion(roles,user.roles![i]);
		}
		return resultado	
	}

	contieneRolPorDescripcion(rolesComponent:Array<String>,rolUser:Rol){
		let resultado: boolean = false;
		rolesComponent.forEach(function(rolPos) {
			if(rolPos  == rolUser.descripcion){
				resultado = true;
			}
			
		  }, this);
		  return resultado;
	}


	logout(): void {
		// remove user from local storage to log user out
		localStorage.removeItem('currentUser');
		this.currentUserSubject.next(null);
	  }

	

	
}
