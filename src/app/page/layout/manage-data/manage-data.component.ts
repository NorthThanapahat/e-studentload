import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/share/provider/provider';
import { ApiProvider } from 'src/app/share/api/api';
import { UtilProvider } from 'src/app/share/util';
import { isNull } from 'util';

@Component({
  selector: 'app-manage-data',
  templateUrl: './manage-data.component.html',
  styleUrls: ['./manage-data.component.css']
})
export class ManageDataComponent implements OnInit {
  startDate: Date;
  startDateStr: string;
  isSetStartDate: boolean;
  dateStart:Date;
  today: Date;
  dataBackup = {
    dateAmt: '',
    startDate: '',
    time:'',
    frequency:''
  };
  date: any = {
    value: ''
  };

  constructor(public data: DataProvider, private api: ApiProvider, public util: UtilProvider) {
    this.data.page = 'manage-data';
    this.today = new Date();
    if (localStorage.getItem('savedata') != undefined || !isNull(JSON.parse(localStorage.getItem('savedata')))) {
      this.dataBackup = JSON.parse(localStorage.getItem('savedata'));
      this.dateStart = this.util.ConvertStringToDatePicker(this.dataBackup.startDate,'YYYY-MM-DD HH:mm:ss');
      console.log(this.dateStart);
      this.startDateStr = this.dataBackup.startDate;
    }
    console.log(this.dataBackup);

  }

  ngOnInit() {
  
  }
  Save() {
    let data = {
      dateAmt: this.dataBackup.dateAmt,
      startDate: this.startDateStr,
      time: this.dataBackup.time,
      frequency: this.dataBackup.frequency
    }
    localStorage.setItem('savedata', JSON.stringify(data));
    console.log(localStorage.getItem('savedata'));
    this.util.MessageSuccess(this.data.language);
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
