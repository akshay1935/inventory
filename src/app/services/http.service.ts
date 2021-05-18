import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public httpHeader = {};
  constructor(private http: HttpClient,private storageService:StorageService, private jwtHelper:JwtHelperService) { }

  get(url:string = "") : Observable<any>{
    const headers = new HttpHeaders();
    const options = { headers : headers, withCredintials : false, observe: "response" as any};
    let response = this.http.get(environment.API_URL+url,options);

    return response;
  }

  post(url: string = "", sendparams: any = {}): Observable<any> {
    const headers = new HttpHeaders();
    const options = { headers : headers, withCredintials : false, observe: "response" as any};
    let response = this.http.post(environment.API_URL+url,sendparams,options);
    return response;
  }

  put(url: string = "", sendparams: any = {}):Observable<any>{
    const headers = new HttpHeaders();
    const options = { headers : headers, withCredintials : false, observe: "response" as any};
    let response = this.http.put(environment.API_URL+url,sendparams,options);
    return response
  }
}
