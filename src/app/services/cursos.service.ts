import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Curso } from "../models/curso.model"


@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private urlApi = 'http://localhost:8080/cursos';

  constructor(private http: HttpClient) { }

  postCurso(data: any): Observable<any>{
    console.log(data);
    return this.http.post<any>((this.urlApi), data);
  }

  getCurso(){
    return this.http.get<any>((this.urlApi))
  }

 /*  putCurso(data2: Curso, id: number){
    let bodyData ={
      "id": data2.id,
    	"nombre": data2.nombre,
      "tema": data2.tema,
    	"fechaInicio": data2.fechaInicio,
    	"idDocente": data2.idDocente
    	
    }
    data2.id = id;  
    console.log(bodyData);
    return this.http.put((this.urlApi), bodyData, {responseType:'json'})
  } */

  /* putCurso(data: any, id: number){
    data.id = id; 
    console.log(data)
    return this.http.put<any>((this.urlApi), data,{responseType:'text'as'json'})
  } */

  putCurso(data: Curso, id: any): Observable<any> {
    console.log("data")
    console.log(data);
    //Conversione a form data
    const bodyData = {
        "id": id,
        "nombre": data.nombre,
        "tema": data.tema,
        "fechaInicio": data.fechaInicio,
        "idDocente": data.idDocente 
        
    };

    
      return this.http.put((this.urlApi), bodyData, {responseType: 'text'});
    }

  deleteCurso(id:number){
    return this.http.delete<any>((this.urlApi)+id, {responseType:'text'as'json'}) 
  }
}

