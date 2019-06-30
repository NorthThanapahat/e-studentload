import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigAPI } from '../ConfigApi';


@Injectable()
export class HomeService {
 
    constructor(private http:HttpClient) {}


    GetApplication(req){
        console.log(req);
        let headers = new HttpHeaders();
        headers = headers.append("Accept", 'application/json');

       return this.http.get(`${ConfigAPI.GetApplication}?personid=${req.personid}&token=${req.accesstoken}`)
    }
   
}