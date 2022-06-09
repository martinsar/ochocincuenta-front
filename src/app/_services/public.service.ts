import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Login }  from 'src/app/_models/login';
import { Rol } from '../_models/rol';
@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private http: HttpClient) { }

  login(emailParam:string, passwordParam:string){
    let _body = {
      email:emailParam,
      password:passwordParam
    }
    return this.http.post<any>(`${environment.api_url}/api/login`,_body);
  }

  rolUsuario(idUser:string){
    return this.http.get<Array<Rol>>(`${environment.api_url}/api/850/rolUsuario/`+idUser);
  }
 

}
