import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataProvider, BackupSetting } from 'src/app/share/provider/provider';
import { UserData } from 'src/app/model/response/user-data';
import { UtilProvider } from 'src/app/share/util';
import { ApiProvider } from 'src/app/share/api/api';
import { isNull } from 'util';
import * as moment from 'moment';
import { BackUpData, BackupListData, StatisticsOfUser } from 'src/app/model/BackupData';
import { HomeService } from 'src/app/share/api/home-service/home-service';
import { ConfigAPI } from 'src/app/share/api/ConfigApi';
import { AllPerson } from 'src/app/model/allperson';
import { async } from 'q';
import { ModalManager } from 'ngb-modal';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  

  click: string;
  page: string;
  newPassword: string = '';
  confirmPassword: string = '';
  backupSetting = {
    dateAmt: '',
    startDate: '',
    time: '',
    frequency: '',
    isRunBackup: false
  };
  err = {
    isErr: false,
    newPassword: false,
    confirmPassword: false
  }
  constructor(public router: Router,
    private modalService: ModalManager,
    public data: DataProvider,
    private homeService: HomeService,
    public util: UtilProvider,
    private api: ApiProvider) {
    this.data.userData = <UserData>this.util.GetUserInfo();
    console.log(this.data.userData.data[0].Password);

    for (let item of this.data.userData.data[0].PermissionMenu.PermissionMenuList) {
      if (item.ApplicationId == '1') {
        this.data.applicationPermission = item.itemPermission;
      }
      if (item.ApplicationId == '2') {
        this.data.personPermission = item.itemPermission;
      }
      if (item.ApplicationId == '3') {
        this.data.organizationPermission = item.itemPermission;
      }
      if (item.ApplicationId == '4') {
        this.data.departmentPermission = item.itemPermission;
      }
      if (item.ApplicationId == '5') {
        this.data.groupPermission = item.itemPermission;
      }
      if (item.ApplicationId == '6') {
        this.data.dashboardPermission = item.itemPermission;
      }
      if (item.ApplicationId == '7') {
        this.data.changePasswordPermission = item.itemPermission;
      }
      if (item.ApplicationId == '8') {
        this.data.passwordManagePermission = item.itemPermission;
      }
      if (item.ApplicationId == '9') {
        this.data.backupPermission = item.itemPermission;
      }
      if (item.ApplicationId == '10') {
        this.data.permissionPermission = item.itemPermission;
      }
      if (item.ApplicationId == '11') {
        this.data.auditlogPermission = item.itemPermission;
      }


    }
    if (this.data.userData == null) {
      this.util.Logout();
    }
    // localStorage.removeItem('backupdata');
    if (localStorage.getItem('savedata') != undefined || !isNull(JSON.parse(localStorage.getItem('savedata')))) {
      this.backupSetting = JSON.parse(localStorage.getItem('savedata'));
      this.data.backupsetting = <BackupSetting>JSON.parse(localStorage.getItem('savedata'));
      let dateStart = this.util.ConvertStringToDatePicker(this.backupSetting.startDate, 'YYYY-MM-DD HH:mm:ss');
      this.data.backupsetting.date = dateStart;
      let today = new Date();
      if (!this.backupSetting.isRunBackup) {

        if (dateStart <= today) {
          this.backupSetting.isRunBackup = true;
          localStorage.setItem('savedata', JSON.stringify(this.backupSetting));
        }
      }
      console.log((moment(dateStart)));
      console.log(moment());
      console.log(dateStart < today);

      if (moment(dateStart).diff(moment(), 'days') == 0) {
        this.data.backupsetting.isDayToBackUp = true;
      } else if (dateStart < today) {
        if (moment(this.backupSetting.startDate, 'YYYY-MM-DD HH:mm:ss').add(Number.parseInt(this.backupSetting.frequency), 'days').diff(moment()) == 0) {
          this.data.backupsetting.isDayToBackUp = true;
        } else {
          this.data.backupsetting.isDayToBackUp = false;
        }
      } else {
        this.data.backupsetting.isDayToBackUp = false;
      }
      this.SaveDataBackup();
    }
    console.log(this.util.GetBackupData());
    console.log(this.data.backupsetting);
    api.GetLog();



  }
  
 
  // CloseModal() {
  //   this.modalService.close(this.modalRef);
  // }
  SaveDataBackup() {
    if (this.data.backupsetting.isDayToBackUp) {
      if (this.util.GetBackupData() == null) {
        this.data.backupData = new BackUpData();
        this.data.backupData.UserData = this.data.userData;
        this.data.backupData.BackUpData = [];

        this.SetDataBackup();
      } else {
        this.data.backupData = <BackUpData>this.util.GetBackupData();
        if (this.data.backupData.BackUpData[this.data.backupData.BackUpData.length - 1].Date != moment().format("DD/MM/YYYY")) {
          this.SetDataBackup();
        }
      }

    }
  }
  async SetDataBackup() {
    this.data.backupListData = new BackupListData();
    this.data.backupListData.Date = moment().format("DD/MM/YYYY");

    this.GetAllApplication();


  }
  async GetLog() {
    await this.api.SendRequestApi(`${ConfigAPI.GetAuditLog}?token=${this.util.GetAccessToken()}&personid=${this.data.userData.data[0].PersonId}`).then(async (res: any) => {
      if (res.successful) {
        this.data.backupListData.Data.AuditLog = await res.data;
        this.data.backupData.BackUpData.push(this.data.backupListData);
        this.util.SetBackupData(this.data.backupData);
        console.log("backupdata=>", this.util.GetBackupData());
      }
    }, (err) => {
      console.log("err===>", err);
      this.util.Logout();
    });
  }
  async GetAllApplication() {
    let data = {
      personid: this.data.userData.data[0].PersonId,
      accesstoken: this.util.GetAccessToken()
    }
    await this.homeService.GetApplication(data).subscribe(async (res: any) => {

      console.log(res);
      if (res.successful) {
        this.data.backupListData.Data.Application = await res.data;
        this.GetAllPerson();

      }
    }, (err) => {
      console.log("err===>", err);

      this.util.Logout();
    });
  }
  async GetAllPerson() {
    await this.api.SendRequestApi(`${ConfigAPI.GetAllPerson}?token=${this.util.GetAccessToken()}`).then(async (res: any) => {
      if (res.successful) {
        this.data.backupListData.Data.Person = await res.data;
        this.GetOrganization();

      } else {
      }
    }, (err) => {
      console.log("err===>", err);
      this.util.Logout();
    });
  }
  async GetOrganization() {
    await this.api.SendRequestApi(`${ConfigAPI.GetAllOrganization}?token=${this.util.GetAccessToken()}`).then(async (res: any) => {
      if (res.successful) {
        this.data.backupListData.Data.Organization = await res.data;
        this.GetDepartment();

      } else {
      }

    });
  }
  async GetDepartment() {
    await this.api.SendRequestApi(`${ConfigAPI.GetAllDepartment}?token=${this.util.GetAccessToken()}`).then(async (res: any) => {
      if (res.successful) {
        this.data.backupListData.Data.Department = await res.data;
        this.GetGroup();

      } else {

      }
    });
  }
  async GetGroup() {
    await this.api.SendRequestApi(`${ConfigAPI.GetAllGroup}?token=${this.util.GetAccessToken()}`).then(async (res: any) => {
      if (res.successful) {
        this.data.backupListData.Data.Group = await res.data;
        this.GetNews();

      } else {
        // if (res.code == '-2146233088') {
        //   this.util.DoError();
        // }
      }
    });
  }
  async GetNews() {
    await this.api.SendRequestApi(`${ConfigAPI.GetNews}?token=${this.util.GetAccessToken()}`).then(async (res: any) => {
      console.log(res);
      if (res.successful) {
        this.data.backupListData.Data.Dashboard.InformationNews = await res.data;
        this.GetAllpermission();

      }
    }, (err) => {

    })
  }
  async GetManagePassword() {
    await this.api.SendRequestApi(`${ConfigAPI.GetPasswordManagement}?personId=${this.data.userData.data[0].PersonId}&token=${this.util.GetAccessToken()}`).then(async (res: any) => {
      if (res.successful) {
        this.data.backupListData.Data.ManagePassword = await res.data;
        this.GetLog();

      } else {
        // if (res.code == '-2146233088') {
        //   this.util.DoError();
        // }
      }


    });
  }

  async GetAllpermission() {
    await this.api.SendRequestApi(`${ConfigAPI.GetAllpermission}?token=${this.util.GetAccessToken()}`).then(async (res: any) => {
      console.log(res);

      if (res.successful) {
        this.data.backupListData.Data.ManagePermission = await res.data;
        this.GetManagePassword();

      } else {
        // if (res.code == '-2146233088') {
        //   this.util.DoError();
        // }
      }
    });
  }
  ngOnInit() {
    console.log(this.data.applicationLog);
    this.page = this.data.page;
    this.data.userData = <UserData>this.util.GetUserInfo();
    this.click = 'home';
    this.router.navigate(['home']);
    console.log(localStorage.getItem('isLoggedin'));
  }

  Page(text) {
    console.log(text);
    this.click = text;
  }
}
