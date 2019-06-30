import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/share/provider/provider';
import { ApiProvider } from 'src/app/share/api/api';
import { UtilProvider } from 'src/app/share/util';
import * as moment from 'moment';
import { ConfigAPI } from 'src/app/share/api/ConfigApi';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  legend: any = [];
  typeChart: any;
  dataChart: any;
  optionsChart: any;
  startDateStr: string;
  endDateStr: string;
  isSetStartDate = false;
  startDate: Date;
  today: Date;
  endDate: Date;
  colors: any = [];
  date: any = {
    value: ''
  };
  constructor(public data: DataProvider, private api: ApiProvider, public util: UtilProvider) {
    this.data.page = 'dashboard';
    this.today = new Date();

  }
  addEvent(type, date, value) {
    if (date == 'start') {
      this.isSetStartDate = true;
      if (type == 'input') {
        this.startDate = new Date(value);
        let isoDate = this.startDate.toISOString();
        this.startDateStr = this.ConvertISODate(isoDate);
        console.log(this.startDate);
        console.log(this.startDateStr);
      } else {
        if (value == null) {
          this.isSetStartDate = false;
        } else {
          this.startDate = new Date(value);
          let isoDate = this.startDate.toISOString();
          this.startDateStr = this.ConvertISODate(isoDate);
        }
        console.log(value);

      }
    } else if (date == 'end') {
      if (type == 'input') {
        console.log(value);
        this.endDate = new Date(value);
        let isoDate = this.endDate.toISOString();
        this.endDateStr = this.ConvertISODate(isoDate);
        this.GetDataStatisticPersonal(this.startDateStr,this.endDateStr);
      } else {
        if (value == null) {
          this.util.MessageError(this.data.language);
        } else {
          this.endDate = new Date(value);
          let isoDate = this.endDate.toISOString();
          this.endDateStr = this.ConvertISODate(isoDate);
          this.GetDataStatisticPersonal(this.startDateStr,this.endDateStr);

        }
      }
    }
  }
  ConvertISODate(date) {
    return moment(date, 'YYYY-MM-DDTHH:mm:ssTZD').format('YYYY-MM-DD HH:mm:ss');

  }
  GetDataStatisticPersonal(startDate, endDate) {
    this.api.SendRequestApi(`${ConfigAPI.GetReportPerson}?token=${this.util.GetAccessToken()}&CreateDate=${startDate}&CreateDate1=${endDate}`).then((res: any) => {
      console.log(res);
    }, (err) => {

    });
  }
  ngOnInit() {
    this.SetChart('line');
  }

  SetChart(type) {
    this.typeChart = type;

    this.legend = ["ERP", "Helpdesk", "สารบัญ"];

    this.colors = [
      { key: "pink", color: "rgb(255, 34, 145)", legend: "ERP" },
      { key: "skybule", color: "rgb(2, 159, 237)", legend: "Helpdesk" },
      { key: "orange", color: "rgb(254, 145, 1)", legend: "สารบัญ" }
    ]

    if (this.typeChart == 'pie') {
      this.dataChart = {
        labels: ["2006-07-12", "2006-08-12", "2006-09-12", "2006-10-12", "2006-11-12"],
        datasets: [
          {
            label: "test",
            data: [1, 4, 5, 7, 8],
            backgroundColor: ['#1abc9c', '#3498db', '#9b59b6', '#bdc3c7', '#f39c12']
          }
        ]
      };

      this.optionsChart = {
        responsive: true,
        maintainAspectRatio: false
      };
    } else {
      this.dataChart = {
        labels: ["2006-07-12", "", "2006-08-12", "", "2006-09-12", "", "2006-10-12", ""],
        datasets: [
          {
            label: "ERP",
            data: [250, 350, 325, 395, 415, 403, 350, 510],
            fill: false,
            lineTension: 0.2,
            borderColor: this.colors[0].color, // สีของเส้น
            borderWidth: 1,
            pointStyle: 'circle',
            backgroundColor: this.colors[0].color
          },
          {
            label: "Helpdesk",
            data: [50, 200, 250, 130, 150, 250, 220, 320],
            fill: false,
            lineTension: 0.2,
            borderColor: this.colors[1].color, // สีของเส้น
            borderWidth: 1,
            pointStyle: 'circle',
            backgroundColor: this.colors[1].color
          },
          {
            label: "สารบัญ",
            data: [124, 150, 95, 230, 280, 320, 350, 290],
            fill: false,
            lineTension: 0.2,
            borderColor: this.colors[2].color, // สีของเส้น
            borderWidth: 1,
            pointStyle: 'circle',
            backgroundColor: this.colors[2].color
          }
        ]
      };
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
              stepSize: 100,
              max: 800,
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


  }

  ChartType(type) {
    console.log(type);
    this.typeChart = type;
    this.SetChart(type);
  }
}
