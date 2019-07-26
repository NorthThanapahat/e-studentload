import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { UtilProvider } from '../util';
import { ConfigAPI } from './ConfigApi';
import { DataProvider } from '../provider/provider';
import * as moment from 'moment';


@Injectable()
export class ApiProvider {

    headers = new HttpHeaders();
    constructor(public http: HttpClient, public util: UtilProvider, private data: DataProvider) {

    }
    setHeader() {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers = headers.append("Accept", 'application/json');

        return headers;
    }

    GetLog() {
        this.data.applicationLog = [];
        this.data.personLog = [];
        this.data.organizationLog = [];
        this.data.departmentLog = [];
        this.data.groupLog = [];
        this.SendRequestApi(`${ConfigAPI.GetAuditLog}?token=${this.util.GetAccessToken()}&personid=${this.data.userData.data[0].PersonId}`).then((res: any) => {
            this.data.allLog = res;

            for (let item of res.data) {
                if (item.Menu == 'application') {
                    this.data.applicationLog = this.util.PushItemArray(this.data.applicationLog, item);
                    for (let i in this.data.applicationLog) {
                        let date = moment(this.data.applicationLog[i].CreateDate, 'MM/DD/YYYY HH:mm:ss a');
                        this.data.applicationLog[i].Month = moment(this.data.applicationLog[i].CreateDate, 'MM/DD/YYYY HH:mm:ss a').format('MMM');
                        this.data.applicationLog[i].Date = moment(this.data.applicationLog[i].CreateDate, 'MM/DD/YYYY HH:mm:ss a').format('DD/MM/YYYY');
                        this.data.applicationLog[i].Time = moment(this.data.applicationLog[i].CreateDate, 'MM/DD/YYYY HH:mm:ss a').format('HH:mm');
                    }
                }
                if (item.Menu == 'person') {
                    this.data.personLog = this.util.PushItemArray(this.data.personLog, item);
                    for (let i in this.data.personLog) {
                        let date = moment(this.data.personLog[i].CreateDate, 'MM/DD/YYYY HH:mm:ss a');
                        this.data.personLog[i].Month = moment(this.data.personLog[i].CreateDate, 'MM/DD/YYYY HH:mm:ss a').format('MMM');
                        this.data.personLog[i].Date = moment(this.data.personLog[i].CreateDate, 'MM/DD/YYYY HH:mm:ss a').format('DD/MM/YYYY');
                        this.data.personLog[i].Time = moment(this.data.personLog[i].CreateDate, 'MM/DD/YYYY HH:mm:ss a').format('HH:mm');
                    }

                }
                if (item.Menu == 'organization') {
                    this.data.organizationLog = this.util.PushItemArray(this.data.organizationLog, item);
                    for (let i in this.data.organizationLog) {
                        let date = moment(this.data.organizationLog[i].CreateDate, 'MM/DD/YYYY HH:mm:ss a');
                        this.data.organizationLog[i].Month = moment(this.data.organizationLog[i].CreateDate, 'MM/DD/YYYY HH:mm:ss a').format('MMM');
                        this.data.organizationLog[i].Date = moment(this.data.organizationLog[i].CreateDate, 'MM/DD/YYYY HH:mm:ss a').format('DD/MM/YYYY');
                        this.data.organizationLog[i].Time = moment(this.data.organizationLog[i].CreateDate, 'MM/DD/YYYY HH:mm:ss a').format('HH:mm');
                    }
                }
                if (item.Menu == 'department') {
                    this.data.departmentLog = this.util.PushItemArray(this.data.departmentLog, item);
                    for (let i in this.data.departmentLog) {
                        let date = moment(this.data.departmentLog[i].CreateDate, 'MM/DD/YYYY HH:mm:ss a');
                        this.data.departmentLog[i].Month = moment(this.data.departmentLog[i].CreateDate, 'MM/DD/YYYY HH:mm:ss a').format('MMM');
                        this.data.departmentLog[i].Date = moment(this.data.departmentLog[i].CreateDate, 'MM/DD/YYYY HH:mm:ss a').format('DD/MM/YYYY');
                        this.data.departmentLog[i].Time = moment(this.data.departmentLog[i].CreateDate, 'MM/DD/YYYY HH:mm:ss a').format('HH:mm');
                    }

                }
                if (item.Menu == 'group') {
                    this.data.groupLog = this.util.PushItemArray(this.data.groupLog, item);
                    for (let i in this.data.groupLog) {
                        this.data.groupLog[i].Month = moment(this.data.groupLog[i].CreateDate, 'MM/DD/YYYY HH:mm:ss a').format('MMM');
                        this.data.groupLog[i].Date = moment(this.data.groupLog[i].CreateDate, 'MM/DD/YYYY HH:mm:ss a').format('DD/MM/YYYY');
                        this.data.groupLog[i].Time = moment(this.data.groupLog[i].CreateDate, 'MM/DD/YYYY HH:mm:ss a').format('HH:mm');
                    }
                }
            }
            console.log("this.data.applicationLog getlog=>", this.data.applicationLog);
            console.log("this.data.personLog getlog=>", this.data.personLog);
            console.log("this.data.organizationLog getlog=>", this.data.organizationLog);
            console.log("this.data.departmentLog getlog=>", this.data.departmentLog);
            console.log("this.data.groupLog getlog=>", this.data.groupLog);

        });
    }

    InsertLog(PersonId, EventLog, Menu) {
        let insertlog = `PersonId=${PersonId}&EventLog=${EventLog}&Menu=${Menu}`;
        this.SendRequestApiWithData(ConfigAPI.InsertLog, insertlog).then((res: any) => {
            this.GetLog();
            console.log(res);
        }, (err) => {
            console.log(err);
        });
    }
    SendImagePostData(url,data){
        const fd = new FormData();
        fd.append('file',data.image,data.image.name);
        fd.append('PersonId',data.PersonId);
        fd.append('IsActive',data.IsActive);
        let headers = new HttpHeaders();
        headers = headers.append("Accept", '*/*');
        headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
       return  this.http.post(url,fd)
    }
    SendRequestApiWithData(url, data) {
        return new Promise((resolve, reject) => {
            let headers = new HttpHeaders();
            headers = headers.append("Accept", '*/*');
            headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
            if (url != ConfigAPI.Login)
                data = data + "&token=" + this.util.GetAccessToken();
            console.log(url + "===> ", data);
            this.http.post(url, data, { headers: headers })
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