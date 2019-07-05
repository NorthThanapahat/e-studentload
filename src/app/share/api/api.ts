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
        this.SendRequestApi(`${ConfigAPI.GetAuditLog}?token=${this.util.GetAccessToken()}&personid=${this.data.userData.data[0].PersonId}`).then((res: any) => {
            this.data.allLog = res;

            for (let item of res.data) {
                if (item.Manu == 'application') {
                    this.data.applicationLog = this.util.PushItemArray(this.data.applicationLog, item);
                    for (let i in this.data.applicationLog) {
                        let date = moment(this.data.applicationLog[i].CreateDate, 'D/M/YYYY HH:mm:ss AM');
                        this.data.applicationLog[i].Month = moment(this.data.applicationLog[i].CreateDate, 'D/M/YYYY HH:mm:ss AM').format('MMM');
                        this.data.applicationLog[i].Date = moment(this.data.applicationLog[i].CreateDate, 'D/M/YYYY HH:mm:ss AM').format('DD/MM/YYYY');
                        this.data.applicationLog[i].Time = moment(this.data.applicationLog[i].CreateDate, 'D/M/YYYY HH:mm:ss AM').format('HH:mm');
                        console.log(this.data.applicationLog);
                    }
                }
                if (item.Manu == 'person') {
                    this.data.personLog = this.util.PushItemArray(this.data.personLog, item);
                    for (let i in this.data.personLog) {
                        let date = moment(this.data.personLog[i].CreateDate, 'D/M/YYYY HH:mm:ss AM');
                        this.data.personLog[i].Month = moment(this.data.personLog[i].CreateDate, 'D/M/YYYY HH:mm:ss AM').format('MMM');
                        this.data.personLog[i].Date = moment(this.data.personLog[i].CreateDate, 'D/M/YYYY HH:mm:ss AM').format('DD/MM/YYYY');
                        this.data.personLog[i].Time = moment(this.data.personLog[i].CreateDate, 'D/M/YYYY HH:mm:ss AM').format('HH:mm');
                        console.log(this.data.personLog);
                    }
                }
                if (item.Manu == 'organization') {
                    this.data.organizationLog = this.util.PushItemArray(this.data.organizationLog, item);
                    for (let i in this.data.organizationLog) {
                        let date = moment(this.data.organizationLog[i].CreateDate, 'D/M/YYYY HH:mm:ss AM');
                        this.data.organizationLog[i].Month = moment(this.data.organizationLog[i].CreateDate, 'D/M/YYYY HH:mm:ss AM').format('MMM');
                        this.data.organizationLog[i].Date = moment(this.data.organizationLog[i].CreateDate, 'D/M/YYYY HH:mm:ss AM').format('DD/MM/YYYY');
                        this.data.organizationLog[i].Time = moment(this.data.organizationLog[i].CreateDate, 'D/M/YYYY HH:mm:ss AM').format('HH:mm');
                        console.log(this.data.organizationLog);
                    }
                }
                if (item.Manu == 'department') {
                    this.data.departmentLog = this.util.PushItemArray(this.data.departmentLog, item);
                    for (let i in this.data.personLog) {
                        let date = moment(this.data.personLog[i].CreateDate, 'D/M/YYYY HH:mm:ss AM');
                        this.data.departmentLog[i].Month = moment(this.data.departmentLog[i].CreateDate, 'D/M/YYYY HH:mm:ss AM').format('MMM');
                        this.data.departmentLog[i].Date = moment(this.data.departmentLog[i].CreateDate, 'D/M/YYYY HH:mm:ss AM').format('DD/MM/YYYY');
                        this.data.departmentLog[i].Time = moment(this.data.departmentLog[i].CreateDate, 'D/M/YYYY HH:mm:ss AM').format('HH:mm');
                        console.log(this.data.departmentLog);
                    }
                }
                if (item.Manu == 'group') {
                    this.data.groupLog = this.util.PushItemArray(this.data.groupLog, item);
                    for (let i in this.data.personLog) {
                        let date = moment(this.data.personLog[i].CreateDate, 'D/M/YYYY HH:mm:ss AM');
                        this.data.groupLog[i].Month = moment(this.data.personLog[i].CreateDate, 'D/M/YYYY HH:mm:ss AM').format('MMM');
                        this.data.personLog[i].Date = moment(this.data.personLog[i].CreateDate, 'D/M/YYYY HH:mm:ss AM').format('DD/MM/YYYY');
                        this.data.groupLog[i].Time = moment(this.data.personLog[i].CreateDate, 'D/M/YYYY HH:mm:ss AM').format('HH:mm');
                        console.log(this.data.personLog);
                    }
                }
            }
            console.log("getlog=>", this.data.applicationLog);
            console.log("getlog=>", this.data.personLog);
            console.log("getlog=>", this.data.organizationLog);
            console.log("getlog=>", this.data.departmentLog);
            console.log("getlog=>", this.data.groupLog);

        });
    }

    InsertLog(PersonId, EventLog, Menu) {
        let insertlog = `PersonId=${PersonId}&EventLog=${EventLog}&Manu=${Menu}`;
        this.SendRequestApiWithData(ConfigAPI.InsertLog, insertlog).then((res: any) => {
            this.GetLog();
            console.log(res);
        }, (err) => {
            console.log(err);
        });
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