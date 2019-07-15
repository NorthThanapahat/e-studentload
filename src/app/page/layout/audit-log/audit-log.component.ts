import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/share/provider/provider';
import { ApiProvider } from 'src/app/share/api/api';
import * as moment from 'moment';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.css']
})
export class AuditLogComponent implements OnInit {


  date: string;
  action: string;
  logData: Array<any>;
  logDataSelect: Array<any>;
  constructor(public data: DataProvider, private api: ApiProvider) {
    this.logData = [];
    this.logDataSelect = [];
    this.action = 'All';
    this.data.page = 'auditlog';
    this.
      api.GetLog();
    if (this.data.allLog.data.length > 0) {
      this.logData = this.data.allLog.data;
      for (let item of this.logData) {
        item.CreateDate = moment(item.CreateDate, 'MM/DD/YYYY hh:mm:ss a').format("DD/MM/YYYY");
        let today = moment(new Date()).format("DD/MM/YYYY");


        if (item.CreateDate == today) {
          this.logDataSelect.push(item);
        }
      }
    }
  }

  ngOnInit() {
    this.date = "today"
  }
  Date(date) {
    this.date = date;


  }
}
