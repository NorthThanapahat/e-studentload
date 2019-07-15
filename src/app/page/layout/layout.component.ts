import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/share/provider/provider';
import { UserData } from 'src/app/model/response/user-data';
import { UtilProvider } from 'src/app/share/util';
import { ApiProvider } from 'src/app/share/api/api';
import { isNull } from 'util';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  click: string;
  page:string;
  backupSetting = {
    dateAmt: '',
    startDate: '',
    time:'',
    frequency:''
  };
  constructor(public router: Router,public data : DataProvider,public util :UtilProvider,private api:ApiProvider) { 
    this.data.userData = <UserData> this.util.GetUserInfo();
    console.log(this.data.userData)
    if(this.data.userData == null){
      this.util.Logout();
    }
    if (localStorage.getItem('savedata') != undefined || !isNull(JSON.parse(localStorage.getItem('savedata')))) {
      this.backupSetting = JSON.parse(localStorage.getItem('savedata'));
      let dateStart = this.util.ConvertStringToDatePicker(this.backupSetting,'YYYY-MM-DD HH:mm:ss');
      let today = new Date();

    }
    api.GetLog();
  }

  ngOnInit() {
    console.log(this.data.applicationLog);
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
