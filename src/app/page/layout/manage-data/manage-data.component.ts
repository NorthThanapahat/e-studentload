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
  time:string;
  dateAmt:string;
  frequency:string;
  today: Date;
  dataSave:any;
  date: any = {
    value: ''
  };
  
  constructor(public data: DataProvider, private api: ApiProvider, public util: UtilProvider) {
    this.data.page = 'manage-data';
    this.today = new Date();
  }

  ngOnInit() {
    if(!isNull(JSON.parse(localStorage.getItem('savedata')))){
      this.dataSave = JSON.parse(localStorage.getItem('savedata'));
      console.log(this.dataSave);
      this.dateAmt = this.dataSave.dateAmt;
      this.time = this.dataSave.time;
      this.date.value = this.dataSave.date;
    }else{
      this.dataSave = {
        save:'0'
      }
    }
    
  }
  Save(){
    let data = {
      dateAmt:this.dateAmt,
      startDate:this.startDateStr,
      time:this.time,
      frequency:this.frequency,
      save:'1'
    }
    localStorage.setItem('savedata',JSON.stringify(data));
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
