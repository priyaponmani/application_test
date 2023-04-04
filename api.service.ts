import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
};
const url = 'http://localhost/hcl_datatable/php/request.php';
@Injectable({
    providedIn: 'root',
  })
  
  export class ApiService {
    constructor(private httpClient: HttpClient){}
   
    public getList(): Observable<any> {
      return this.httpClient.get(url+'/list',httpOptions);
    }

    public deleteList(data:any): Observable<any>{
      console.log(data);
      return this.httpClient.post(url+'/delete',{params:data});
     //return this.httpClient.post(url+'/delete',data);
    }
    public addList(body:FormData): Observable<any> {
      return this.httpClient.post(url+'/add',body);
    }
  } 