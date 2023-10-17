import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MaterialesService {

  private urlApi = 'http://localhost:8080/materiales';

  constructor(private http: HttpClient) { }

  postMaterial(data: any): Observable<any>{
    console.log(data);
    console.log((this.urlApi));
    return this.http.post<any>((this.urlApi), data);
  }

  getMaterial(){
    return this.http.get<any>((this.urlApi))
  }

  putMaterial(data: any, id: number){
    data.id = id; 
    return this.http.put<any>((this.urlApi), data, {responseType:'text'as'json'})
  }

  deleteMaterial(id:number){
    return this.http.delete<any>((this.urlApi)+ "/" +id, {responseType:'text'as'json'}) 
  }
}

