import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { UtilProvider } from '../util';


@Injectable()
export class ApiProvider {

    headers = new HttpHeaders();
    constructor(public http: HttpClient, public util: UtilProvider) {

    }
    setHeader() {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers = headers.append("Accept", 'application/json');

        return headers;
    }

    SendRequestApiWithData(url, data) {
        return new Promise((resolve, reject) => {
            let headers = new HttpHeaders();
            headers = headers.append("Accept", '*/*');
            headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
            data = data + "&token=" + this.util.GetAccessToken();
            console.log(url + "===> ", data);
            this.http.post(url, data, { headers: headers })
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
                .subscribe((res: any) => {
                    console.log(url + ' response ===>', res);
                    if (!res.successful) {
                        if (res.code == '-2146233088') {
                            this.util.DoError();
                        }
                    }
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

}