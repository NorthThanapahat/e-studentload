import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/share/provider/provider';
import { UserData } from 'src/app/model/response/user-data';
import { UtilProvider } from 'src/app/share/util';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  click: string;
  page:string;
  constructor(public router: Router,public data : DataProvider,public util :UtilProvider) { }

  ngOnInit() {
    this.page = this.data.page;
    this.data.userData  = <UserData> this.util.GetUserInfo();
    this.click = 'home';
    this.router.navigate(['home']);
    console.log(localStorage.getItem('isLoggedin'));
  }
  Page(text) {
    console.log(text);
    this.click = text;
  }
}
