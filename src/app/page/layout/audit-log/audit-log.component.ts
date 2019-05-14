import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.css']
})
export class AuditLogComponent implements OnInit {


  date:string;
  constructor() { }

  ngOnInit() {
    this.date = "today"
  }
  Date(date){
    this.date = date;
  }
}
