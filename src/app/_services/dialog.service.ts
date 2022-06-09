import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Partido } from '../_models/partido';
import { Departamento } from '../_models/departamento';
import { Provincia } from '../_models/provincia';
import { Localidad } from '../_models/localidad';
import { CodigoPostal }  from '../_models/codigoPostal';
import { Equivalencia } from '../_models/equivalencia';
import { Osr } from '../_models/osr';
import { Tramo } from '../_models/tramo';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private http: HttpClient) { }


 
  listarCircuitosPorSeccion(idSeccion:string){
    return this.http.get<Array<Partido>>(`${environment.api_url}/api/850/circuitos/`+idSeccion);
  }

  listarDepartamentos(id_provincia:number){
    let _body = {
      id_provincia:id_provincia 
    }
    return this.http.post<Array<Departamento>>(`${environment.api_url}/api/850/departamentos`,_body);
  }

  listarAllDepartamentos(){
    return this.http.get<Array<Departamento>>(`${environment.api_url}/api/850/departamentos`);
  }

  listTodasProvincias(){
    return this.http.get<Array<Provincia>>(`${environment.api_url}/api/850/provincias`);
  }

  listLocalidadesPorSeccion(nombreSeccion:string,idCircuitoSelected?:string){
    let _body = {
      nombre:nombreSeccion,
      circuito: idCircuitoSelected,
    }
    return this.http.post<Array<Localidad>>(`${environment.api_url}/api/850/localidades`,_body);
  }

  listCodigosPostalesPorIdProvincia(id_provincia:number){
    let _body = {
      id_provincia:id_provincia 
    }
    return this.http.post<Array<CodigoPostal>>(`${environment.api_url}/api/850/cp`,_body);
  }

  listEquivalencias(id_partido:string){
    let _body = {
      id_partido:id_partido 
    }
    return this.http.post<Array<Equivalencia>>(`${environment.api_url}/api/850/equiloc`,_body);
  }

  listOsr(id_provincia?:number){
    return this.http.get<Array<Osr>>(`${environment.api_url}/api/850/OSR`+(id_provincia!=undefined?("?id_provincia="+id_provincia):""));
  }

  listCalles(id_seccion:string){
    return this.http.get<Array<Equivalencia>>(`${environment.api_url}/api/850/calles/`+id_seccion);
  }

  listTramoConCruces(id_seccion:string,numeroCalle1:string,nombreCalle1:string,numeroCalle2:string,nombreCalle2:string){
    let _body = {
      "id_seccion":id_seccion,
	    "numeroCalle1": numeroCalle1,
	    "nombreCalle1": nombreCalle1,
    	"numeroCalle2":numeroCalle2,
	    "nombreCalle2": nombreCalle2
    }
    return this.http.post<Array<Tramo>>(`${environment.api_url}/api/850/cruce`,_body);
  }

  updateTramo(tramo:Tramo){
    ///850/updateTramo/
    let _body = tramo;
    return this.http.patch<any>(`${environment.api_url}/api/850/updateTramo/`+tramo.id_tramo,_body);
  }
  
  saveTramo(tramos:Tramo[]){
    ///850/updateTramo/
    let _body = {
      "id_seccion":tramos[0].id_seccion,
      "codigo":null,
      "tramos":tramos,
    };
    console.log()
    return this.http.post<any>(`${environment.api_url}/api/850/saveTramo`,_body);
  }

}
