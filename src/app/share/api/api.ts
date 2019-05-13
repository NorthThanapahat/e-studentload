import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";


@Injectable()
export class ApiProvider {

    headers = new HttpHeaders();
    constructor(public http: HttpClient) {

    }
    setHeader() {
        let headers = new HttpHeaders();
        headers = headers.append("Accept", 'application/json');
        headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return headers;
    }
    

    SendRequestApi(url) {
        return new Promise((resolve, reject) => {
            let headers = this.setHeader();

            this.http.get(url,{headers})
                .subscribe(res => {
                    console.log(url + ' response ===>', res);
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

}