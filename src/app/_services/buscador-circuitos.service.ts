import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Partido } from '../_models/partido';
import { Departamento } from '../_models/departamento';
import { Provincia } from '../_models/provincia';
import { Localidad } from '../_models/localidad';
import { Tramo } from '../_models/tramo';
@Injectable({
  providedIn: 'root'
})
export class BuscadorCircuitosService {

  constructor(private http: HttpClient) { }

  listarSerrciones(){
    return this.http.get<Array<Partido>>(`${environment.api_url}/api/secciones`);
  }

  listarTramosPorIdSeccion(idSeccion: string){
    return this.http.get<Array<Partido>>(`${environment.api_url}/api/850/tramos/`+idSeccion);
  }

  listarTramosPorCodigo(idSeccion:string,nombreCalle:string,numeroCalle:string,filtro:string,tipo:string){
    let _body = {
      "idSeccion":idSeccion,
      "nombreCalle": nombreCalle,
      "numeroCalle": numeroCalle,
      "filtro":filtro,
      "tipo":tipo

    }
    return this.http.post<Array<Array<Tramo>>>(`${environment.api_url}/api/850/tramoCodigo`,_body);
  }


  listarTipos(){
    return this.http.get<Array<Partido>>(`${environment.api_url}/api/850/tipos`);
  }

  bajaTramo(id_tramo:number){
    return this.http.delete<Tramo>(`${environment.api_url}/api/850/bajaTramo/`+id_tramo);
  }

 

}
