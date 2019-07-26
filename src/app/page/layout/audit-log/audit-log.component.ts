import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/share/provider/provider';
import { ApiProvider } from 'src/app/share/api/api';
import * as moment from 'moment';
import { UtilProvider } from 'src/app/share/util';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.css']
})
export class AuditLogComponent implements OnInit {
  startDate: Date;
  endDate: Date;

  isSetStartDate = false;
  date: string;
  action: string;
  logData: Array<any>; 
  startDateStr: string;
  endDateStr: string;
  logDataSelect: Array<any>;
  err = {
      startDate: false,
      endDate: false
  }
  dateLog = {
    value: ''
  };
  constructor(public data: DataProvider, 
    public util : UtilProvider,
    private api: ApiProvider) {
    this.logData = [];
    this.logDataSelect = [];
    this.action = 'All';
    this.data.page = 'auditlog';
    this.api.GetLog();
    
  }
  addEvent(type, date, value) {
    console.log(value)
    if (date == 'start') {
      this.isSetStartDate = true;
      if (type == 'input') {
        this.startDate = new Date(value);
        let isoDate = this.startDate.toISOString();
        this.startDateStr = this.util.ConvertISODate(isoDate);

      } else {
        if (value == null) {
          this.isSetStartDate = false;
        } else {
          this.startDate = new Date(value);
          let isoDate = this.startDate.toISOString();
          this.startDateStr = this.util.ConvertISODate(isoDate);
        }

      }
      
      
    } else if (date == 'end') {
      if (type == 'input') {
        this.endDate = new Date(value);
        let isoDate = this.endDate.toISOString();
        this.endDateStr = this.util.ConvertISODate(isoDate);
      } else {
        if (value == null) {
          this.util.MessageError(this.data.language);
        } else {
          this.endDate = new Date(value);
          let isoDate = this.endDate.toISOString();
          this.endDateStr = this.util.ConvertISODate(isoDate);
        }
      }
    }
    if((this.startDate != null || this.startDate != undefined)&&(this.endDate != null || this.endDate != undefined)){
      this.FillterLog();
    }
    if (this.endDateStr != '') {
      this.err.endDate = false;
    }
    if (this.startDateStr != '') {
      this.err.startDate = false;
    }
  }
  ActionChange(event){
    this.FillterLog();
    console.log(event);
  }
  FillterLog(){
    this.logDataSelect = [];
    if (this.data.allLog.data.length > 0) {
      this.logData = this.data.allLog.data;
      for (let item of this.logData) {
        let date = new Date(item.CreateDate);
        if(this.action == 'All'){
          if (date >= this.startDate && date <= this.endDate) {
            this.logDataSelect.push(item);
          }
        }
        else if(this.action == 'Insert'){
          if(item.EventLog == "Insert"){
            if (date >= this.startDate && date <= this.endDate) {
              this.logDataSelect.push(item);
            }
          }
        }
        else if(this.action == 'Update'){
          if(item.EventLog == "Update"){
            if (date >= this.startDate && date <= this.endDate) {
              this.logDataSelect.push(item);
            }
          }
        } else if(this.action == 'Delete'){
          if(item.EventLog == "Delete"){
            if (date >= this.startDate && date <= this.endDate) {
              this.logDataSelect.push(item);
            }
          }
        }
        // item.CreateDate = 
        // let today = moment(new Date()).format("DD/MM/YYYY");
        
      }
    }
  }
  ngOnInit() {
    this.date = "today"
    this.logDataSelect = this.data.allLog.data;

  }
  Date(date) {
    this.date = date;


  }
}
