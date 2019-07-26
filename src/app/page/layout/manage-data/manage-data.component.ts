import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/share/provider/provider';
import { ApiProvider } from 'src/app/share/api/api';
import { UtilProvider } from 'src/app/share/util';
import { isNull } from 'util';
import { ExcelService } from '../dashboard/exportAsExcelFile';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';

@Component({
  selector: 'app-manage-data',
  templateUrl: './manage-data.component.html',
  styleUrls: ['./manage-data.component.css']
})
export class ManageDataComponent implements OnInit {
  startDate: Date;
  startDateStr: string;
  isSetStartDate: boolean;
  dateStart: Date;
  today: Date;
  downloadJsonHref;
  dataBackup = {
    dateAmt: '',
    startDate: '',
    time: '',
    frequency: '',
    isRunBackup: false
  };
  date: any = {
    value: ''
  };
  filename: string;
  constructor(public data: DataProvider,
    private sanitizer: DomSanitizer,
    private api: ApiProvider, public excelService: ExcelService, public util: UtilProvider) {
    this.data.page = 'manage-data';
    this.today = new Date();
    if (localStorage.getItem('savedata') != undefined || !isNull(JSON.parse(localStorage.getItem('savedata')))) {
      this.dataBackup = JSON.parse(localStorage.getItem('savedata'));
      this.dateStart = this.util.ConvertStringToDatePicker(this.dataBackup.startDate, 'YYYY-MM-DD HH:mm:ss');
      console.log(this.dateStart);
      this.startDateStr = this.dataBackup.startDate;
    }
    console.log(this.dataBackup);
    this.ExportJSON();
    this.filename = "Backup_" + moment().format("DDMMYYYY") + ".json";

  }

  ngOnInit() {

  }
  SetFilename() {
  }
  Save() {

    if (this.dateStart <= this.today) {
      this.dataBackup.isRunBackup = true;
    } else {
      this.dataBackup.isRunBackup = false;
    }
    let data = {
      dateAmt: this.dataBackup.dateAmt,
      startDate: this.startDateStr,
      time: this.dataBackup.time,
      frequency: this.dataBackup.frequency,
      isRunBackup: this.dataBackup.isRunBackup
    }
    localStorage.setItem('savedata', JSON.stringify(data));
    console.log(localStorage.getItem('savedata'));
    this.util.MessageSuccess(this.data.language);

  }
  ExportJSON() {
    var theJSON = JSON.stringify(this.data.backupData);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;
  }
  addEvent(type, date, value) {
    if (type == 'input') {
      this.startDate = new Date(value);
      let isoDate = this.startDate.toISOString();
      this.startDateStr = this.util.ConvertISODate(isoDate);
      console.log(this.startDate);
      console.log(this.startDateStr);
    } else {
      if (value == null) {
        this.isSetStartDate = false;
      } else {
        this.startDate = new Date(value);
        let isoDate = this.startDate.toISOString();
        this.startDateStr = this.util.ConvertISODate(isoDate);
      }
      console.log(value);

    }
  }
}
