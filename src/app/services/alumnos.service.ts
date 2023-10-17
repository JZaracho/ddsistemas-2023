import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Curso } from "../models/curso.model"
import { Temas } from "../models/temas.model"


@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private urlApi = 'http://localhost:8080/alumnos';

  constructor(private http: HttpClient) { }

  postAlumno(data: any): Observable<any>{
    console.log(data);
    return this.http.post<any>((this.urlApi), data);
  }

  getAlumno(){
    return this.http.get<any>((this.urlApi));
  }

  putAlumno(data: any, id: number){
    data.id = id; 
    console.log((this.urlApi)+id);
    console.log(data);
    return this.http.put<any>((this.urlApi), data,{responseType:'text'as'json'});
  }

  deleteAlumno(id:number){
    return this.http.delete<any>((this.urlApi)+ "/" +id,{responseType:'text'as'json'});
  }
}

