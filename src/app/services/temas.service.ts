import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Curso } from "../models/curso.model"
import { Temas } from "../models/temas.model"


@Injectable({
  providedIn: 'root'
})
export class TemasService {

  private urlApi = 'http://localhost:8080/temas';

  constructor(private http: HttpClient) { }

  postTema(data: any): Observable<any>{
    return this.http.post<any>((this.urlApi), data);
  }

  getTema(){
    return this.http.get<any>((this.urlApi))
  }

  putTema(data: any, id: number){
    data.id = id; 
    console.log(data)
    return this.http.put<any>((this.urlApi), data,{responseType:'text'as'json'})
  }

  deleteTema(id:number){
    return this.http.delete<any>((this.urlApi)+ "/" + id,{responseType:'text'as'json'}) 
  }
}

