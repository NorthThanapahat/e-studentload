import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoadingComponent } from '../modal/loading/loading.component';
import { AlertComponent } from '../modal/forget-password/alert.component';
import { ThailandData } from '../constant/ThailandData';
import { Router } from '@angular/router';
import { DataProvider } from './provider/provider';
import * as moment from 'moment';

@Injectable()
export class UtilProvider {

  loading: any;
  constructor(private router: Router, private data: DataProvider, private dialog: MatDialog) {

  }
  ConfigDialog(width: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = width;

    return dialogConfig;
  }

  SetUserInfo(userInfo) {
    localStorage.setItem('userinfo', JSON.stringify(userInfo));
  }
  GetUserInfo(): any {
    return JSON.parse(localStorage.getItem('userinfo'));
  }

  readThis(inputValue: any): any {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);

    return myReader;
  }

  Logout() {
    localStorage.removeItem('userinfo');
    localStorage.removeItem('language');
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('accesstoken');
    localStorage.setItem("language", 'th');
  }

  ShowLoading() {
    this.loading = this.dialog.open(LoadingComponent, {
      panelClass: "background-transperent",
      disableClose: true
    });
  }
  HideLoading() {
    this.loading.close();
  }
  ConvertISODate(date) {
    return moment(date, 'YYYY-MM-DDTHH:mm:ssTZD').format('YYYY-MM-DD HH:mm:ss');
  }
  ConvertStringToDatePicker(string,format) {
    return new Date(moment(string,format).format('YYYY-MM-DDTHH:mm:ss'));
  }
  ConvertFormatDate(text,formatString,formatConvertstring){
    return moment(text,formatString).format(formatConvertstring);

  }
  PushItemArray(array: Array<any>, item) {
    let newarray = array;
    if (newarray == undefined) {
      newarray = [];
      newarray.push(item);
      console.log(newarray);
    } else {
      newarray.push(item);
    }

    return newarray;
  }
  DoError() {
    this.Logout();
    this.MessageError(this.data.language);
    this.router.navigate(['/login'])
  }
  SwitchLanguage(language: string, data, translate) {
    translate.use(language);
    data.language = language;
    localStorage.setItem("language", language);
    if (language == 'th') {
      data.province = ThailandData.province.th.changwats;
      data.district = ThailandData.district.th.amphoes;
      data.subDistrict = ThailandData.subDistrict.th.tambons;
    } else if (language == 'en') {
      data.province = ThailandData.province.en.changwats;
      data.district = ThailandData.district.en.amphoes;
      data.subDistrict = ThailandData.subDistrict.en.tambons;
    }

  }
  MessageSuccess(language) {
    if (language == 'th') {
      this.AlertMessage('ผลการดำเนินการ', 'ดำเนินการสำเร็จ', {});

    } else if (language == 'en') {
      this.AlertMessage('Result', 'Successful', {});
    }
  }

  MessageError(language) {

    if (language == 'th') {
      this.AlertMessage('เกิดข้อผิดพลาด', 'ไม่สามารถดำเนินการได้ กรุณาตรวจสอบอีกครั้ง', {});

    } else if (language == 'en') {
      this.AlertMessage('Insert Data Incomplete !', 'Cann\'t process . Please try again.', {});

    }
  }
  MessageErrorText(language, text) {

    if (language == 'th') {
      this.AlertMessage('เกิดข้อผิดพลาด', text, {});

    } else if (language == 'en') {
      this.AlertMessage('Insert Data Incomplete !', text, {});

    }
  }
  AlertMessage(title: string, content: string, data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.panelClass = "popup-modal"
    dialogConfig.data = { title: title, body: content, data };

    this.dialog.open(AlertComponent, dialogConfig);
  }

  SetAccessToken(accesstoken) {
    localStorage.setItem('accesstoken', accesstoken);
  }

  GetAccessToken() {
    return localStorage.getItem('accesstoken');
  }
}