import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/share/provider/provider';
import { ApiProvider } from 'src/app/share/api/api';
import { UtilProvider } from 'src/app/share/util';
import * as moment from 'moment';
import { ConfigAPI } from 'src/app/share/api/ConfigApi';
import { ExcelService } from './exportAsExcelFile';

export interface dataElement {
  PersonId: number;
  Fname: string;
  Lname: string;
  CreateDate: string;
}

const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  legend: any = [];
  newsList: Array<any>;
  typeChart: any = 'line';
  dataChart: any;
  optionsChart: any;
  startDateStr: string;
  endDateStr: string;
  isSetStartDate = false;
  isInsertNews = false;
  startDate: Date;
  startDateNews: Date;
  today: Date;
  year;
  endDate: Date;
  endDateNews: Date;
  submenu: number;
  menu: string;
  date = {
    value: ''
  };
  dateNews = {
    value: ''
  };
  err = {
    news: {
      header: false,
      details: false,
      startDate: false,
      endDate: false
    }
  }
  News = {
    NewId:'',
    header: '',
    details: '',
    startDate:'',
    endDate:''
  }
  dataResult: dataElement[];
  displayedColumns: string[] = ['PersonId', 'PersonName', 'CreateDate'];

  constructor(public data: DataProvider, private api: ApiProvider, public util: UtilProvider,
    private excelService: ExcelService) {
    this.data.page = 'dashboard';
    this.newsList = [];
    this.menu = '1';
    this.submenu = 3.1
    this.startDateStr = '';
    this.endDateStr = '';
    this.today = new Date();
    this.year = this.today.getFullYear();

    this.GetNews();
  }

  GetNews() {
    this.api.SendRequestApi(`${ConfigAPI.GetNews}?token=${this.util.GetAccessToken()}`).then((res: any) => {
      console.log(res);
      if (res.successful) {
        this.newsList = res.data;
        let today = new Date()
        for(let itemNews of res.data){
          let StrDate = new Date(itemNews.StrDate);
          let EndDate = new Date(itemNews.EndDate);
          // console.log(new Date(itemNews.StrDate));
          if(today >= StrDate && today <= EndDate){
            itemNews.IsActive = '1';
          }else if(today< StrDate){
            itemNews.IsActive = '0';
          }else if(today > EndDate){
            itemNews.IsActive = '2';
          }
        }
      }
    }, (err) => {

    })
  }
  DashboardMenu(menu) {
    this.menu = menu;
  }

  ngOnInit() {

    this.optionsChart = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: { color: 'rgba(255,255,255,0.1)' }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 20,
            max: 100,
          },
          gridLines: { color: 'rgb(2, 122, 237)' }
        }]
      }, elements: {
        line: {
          tension: 0 // disables bezier curves
        }
      }
    };

  }
  AddNews() {
    this.isInsertNews = true;
    this.submenu = 3.2;
  }
  EditNews(item) {
    this.isInsertNews = false;
    this.submenu = 3.2;
    this.News.header = item.TopicNew;
    this.News.details = item.DetailNew;
    this.News.NewId = item.NewId;
    this.startDateNews = new Date(moment(item.StrDate,'MM/DD/YYYY hh:mm:ss A').format('YYYY-MM-DDTHH:mm:ss'));
    this.endDateNews = new Date(moment(item.EndDate,'MM/DD/YYYY hh:mm:ss A').format('YYYY-MM-DDTHH:mm:ss'));
    this.isSetStartDate = true;
    this.startDateStr = this.ConvertISODate(this.startDateNews.toISOString());
    this.endDateStr = this.ConvertISODate(this.endDateNews.toISOString());
    console.log(this.startDateNews)
  }
  DeleteNews(item) {
    this.isInsertNews = false;
    this.News.header = item.TopicNew;
    this.News.details = item.DetailNew;
    this.News.NewId = item.NewId;
    this.startDateNews = new Date(moment(item.StrDate,'MM/DD/YYYY hh:mm:ss A').format('YYYY-MM-DDTHH:mm:ss'));
    this.endDateNews = new Date(moment(item.EndDate,'MM/DD/YYYY hh:mm:ss A').format('YYYY-MM-DDTHH:mm:ss'));
    this.isSetStartDate = true;
    this.startDateStr = this.ConvertISODate(this.startDateNews.toISOString());
    this.endDateStr = this.ConvertISODate(this.endDateNews.toISOString());
  }
  SaveDeleteNews(){
    let data= `NewId=${this.News.NewId}`;
    this.api.SendRequestApiWithData(ConfigAPI.DeleteNews,data).then((res:any)=>{
      if(res.successful){
        this.util.MessageSuccess(this.data.language);
        this.GetNews();
      }
    },(err)=>{
      this.util.MessageError(this.data.language);
    });
  }
  Save() {
    console.log(this.News);
    console.log(this.startDateStr);
    console.log(this.startDate);
    console.log(this.endDateStr);
    if (this.News.header == '' || this.News.details == '' || this.startDateStr == '' || this.endDateStr == '') {
      if (this.News.header == '') {
        this.err.news.header = true;
      }
      if (this.News.details == '') {
        this.err.news.details = true;
      }
      if (this.startDateStr == '') {
        this.err.news.startDate = true;
      }
      if (this.endDateStr == '') {
        this.err.news.endDate = true;
      }

    } else {
      var isactive = '';
      if (this.today < this.startDate) {
        isactive = '0';
      }
      if (this.today >= this.startDate && this.today <= this.endDate) {
        isactive = '1';
      }
      if (this.isInsertNews) {
        let data = `TopicNew=${this.News.header}&DetailNew=${this.News.details}&StrDate=${this.startDateStr}&EndDate=${this.endDateStr}&CreateBy=${this.data.userData.data[0].UserId}&PermissionName=&IsActive = ${isactive}`
        this.api.SendRequestApiWithData(ConfigAPI.InsertNews, data).then((res: any) => {
          if (res.successful){
            this.util.MessageSuccess(this.data.language);
            this.GetNews();
            this.submenu = 3.1;
          }
        }, (err) => {
          console.log(err);
          this.util.MessageError(this.data.language);
        })

      }else{
        let data = `NewId=${this.News.NewId}&TopicNew=${this.News.header}&DetailNew=${this.News.details}&StrDate=${this.startDateStr}&EndDate=${this.endDateStr}&CreateBy=${this.data.userData.data[0].UserId}&PermissionName=&IsActive = ${isactive}`
        this.api.SendRequestApiWithData(ConfigAPI.UpdateNews, data).then((res: any) => {
          if (res.successful){
            this.util.MessageSuccess(this.data.language);
            this.GetNews();
            this.submenu = 3.1;
          }
        }, (err) => {
          console.log(err);
          this.util.MessageError(this.data.language);
        })


      }
    }

  }
  CancleAddNews() {
    this.submenu = 3.1;
  }
  addEvent(type, date, value) {
    console.log(value)
    if (date == 'start') {
      this.isSetStartDate = true;
      if (type == 'input') {
        this.startDate = new Date(value);
        let isoDate = this.startDate.toISOString();
        this.startDateStr = this.ConvertISODate(isoDate);

      } else {
        if (value == null) {
          this.isSetStartDate = false;
        } else {
          this.startDate = new Date(value);
          let isoDate = this.startDate.toISOString();
          this.startDateStr = this.ConvertISODate(isoDate);
        }

      }
    } else if (date == 'end') {
      if (type == 'input') {
        this.endDate = new Date(value);
        let isoDate = this.endDate.toISOString();
        this.endDateStr = this.ConvertISODate(isoDate);
      } else {
        if (value == null) {
          this.util.MessageError(this.data.language);
        } else {
          this.endDate = new Date(value);
          let isoDate = this.endDate.toISOString();
          this.endDateStr = this.ConvertISODate(isoDate);
        }
      }
    }

    if (this.endDateStr != '') {
      this.err.news.endDate = false;
    }
    if (this.startDateStr != '') {
      this.err.news.startDate = false;
    }
  }

  ConvertISODate(date) {
    return moment(date, 'YYYY-MM-DDTHH:mm:ssTZD').format('YYYY-MM-DD HH:mm:ss');
  }


  GetDataStatisticPersonal() {

    this.isUserLog = false;
    this.api.SendRequestApi(`${ConfigAPI.GetReportPerson}?token=${this.util.GetAccessToken()}&strdate=${this.startDateStr}&enddate=${this.endDateStr}`)
      .then((res: any) => {
        if (res.successful) {
          this.dataResult = res.data;
          this.PrepareData();
        } else {
          // if (res.code == '-2146233088') {
          //   this.util.DoError();
          // }
        }
      }, (err) => {

      });
  }

  random_rgba() {
    var r = Math.floor(Math.random() * 256);          // Random between 0-255
    var g = Math.floor(Math.random() * 256);          // Random between 0-255
    var b = Math.floor(Math.random() * 256);          // Random between 0-255
    return 'rgb(' + r + ',' + g + ',' + b + ')'; // Collect all to a string
  }

  PrepareData() {
    const date = groupBy('CreateDate');
    const dataGroupStr: any = JSON.stringify({
      date: date(this.dataResult),
    }, null, 2);
    const dataGroup = JSON.parse(dataGroupStr).date;
    const mapped = Object.keys(dataGroup).map(key => ({ date: key, value: dataGroup[key] }));

    switch (this.typeChart) {
      case 'pie':
        this.dataChart = {
          labels: [],
          datasets: [{
            data: [],
            backgroundColor: []
          }]
        };
        mapped.forEach(e => {
          let d = new Date(e.date.replace('12:00:00 AM', ''));
          this.dataChart.labels.push(d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear());
          this.dataChart.datasets[0].data.push(e.value.length);
          this.dataChart.datasets[0].backgroundColor.push(this.random_rgba());
        });
        break;
      default:
        let color = this.random_rgba();
        this.dataChart = {
          labels: [],
          datasets: [{
            label: "จำนวนผู้ใช้งาน",
            data: [],
            fill: false,
            lineTension: 0.2,
            borderColor: color,
            borderWidth: 1,
            pointStyle: 'circle',
            backgroundColor: color
          }]
        };
        mapped.forEach(e => {
          let d = new Date(e.date.replace('12:00:00 AM', ''));
          this.dataChart.labels.push(d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear());
          this.dataChart.datasets[0].data.push(e.value.length);
        });
        break;
    }
  }

  ChartType(type) {
    this.typeChart = type;
    this.PrepareData();
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.dataResult, 'report');
  }


  isUserLog = false;
  GetRepostUserLog() {
    this.isUserLog = true;
    this.api.SendRequestApi(`${ConfigAPI.GetReportUserLog}?token=${this.util.GetAccessToken()}&strdate=${this.startDateStr}&enddate=${this.endDateStr}`)
      .then((res: any) => {
        if (res.successful) {
          this.dataResult = res.data;
          this.PrepareData();
        } else {
          // if (res.code == '-2146233088') {
          //   this.util.DoError();
          // }
        }
      }, (err) => {

      });
  }
}
