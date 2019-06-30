import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/share/provider/provider';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.css']
})
export class AuditLogComponent implements OnInit {


  date:string;
  constructor(public data:DataProvider) {
    this.data.page = 'auditlog'
   }

  ngOnInit() {
    this.date = "today"
  }
  Date(date){
    this.date = date;
  }
}
