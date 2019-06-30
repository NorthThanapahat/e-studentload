import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigAPI } from '../api/ConfigApi';


@Injectable()
export class LoginPageService {
 
    constructor(private http:HttpClient) {}


    GetUserInfo(req){
        let headers = new HttpHeaders();
        headers = headers.append("Accept", 'application/json');

       return this.http.get(`${ConfigAPI.GetUserInfo}?token=${req.accesstoken}`)
    }
   
}