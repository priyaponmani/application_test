import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
};
const url = 'http://localhost/hcl_datatable/php/request.php';
/*-----Injectable by root----*/
@Injectable({
    providedIn: 'root',
  })
  
  export class ApiService {
    constructor(private httpClient: HttpClient){}
    /*-----list from resp api----*/
    public getList(): Observable<any> {
      return this.httpClient.get(url+'/list',httpOptions);
    }
    /*-----single delete and multiple delete----*/
    public deleteList(data:any): Observable<any>{
      return this.httpClient.post(url+'/delete',{params:data});
    }
    /*-----add new csv row----*/
    public addList(body:FormData): Observable<any> {
      return this.httpClient.post(url+'/add',body);
    }
    /*-----check item already exist or not----*/
    public checkItem(item:any):Observable<any>{
      return this.httpClient.post(url+'/checkItem',{params:item});
    }
  } 