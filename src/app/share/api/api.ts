import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";


@Injectable()
export class ApiProvider {

    headers = new HttpHeaders();
    constructor(public http: HttpClient) {

    }
    setHeader() {
        let headers = new HttpHeaders();
        headers = headers.append("Accept", 'application/json');
        headers = headers.append('Content-Type', 'multipart/form-data');

        return headers;
    }
    SendGetRequestApiWithParam(url, data) {

        return new Promise((resolve, reject) => {
            let headers = this.setHeader();
            let param = new HttpParams().set(data.key, data.value);


            this.http.get(url, { headers, params: param })
                .subscribe(res => {
                    console.log(url + ' response ===>', res);
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }
    SendRequestApiWithData(url, data) {
        return new Promise((resolve, reject) => {
            let headers = new HttpHeaders();
            headers = headers.append("Accept", '*/*');
            headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

            console.log(url+"===> ",data);
            this.http.post(url, data, { headers: headers })
                .subscribe(res => {
                    console.log(url + ' response ===>', res);
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    SendPutRequestApiWithData(url, data) {
        return new Promise((resolve, reject) => {
            let headers = new HttpHeaders();
            headers = headers.append("Accept", '*/*');
            headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

            console.log(url+"===> ",data);
            for (var pair of data.entries()) {
                console.log(url+"===> ",pair); 
            }
            this.http.put(url, data, { headers: headers })
                .subscribe(res => {
                    console.log(url + ' response ===>', res);
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }
    
    SendRequestApi(url) {
        return new Promise((resolve, reject) => {
            let headers = this.setHeader();

            this.http.get(url, { headers })
                .subscribe(res => {
                    console.log(url + ' response ===>', res);
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

}