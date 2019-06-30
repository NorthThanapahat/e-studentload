import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiProvider } from 'src/app/share/api/api';
import { DataProvider } from 'src/app/share/provider/provider';
import { ConfigAPI } from 'src/app/share/api/ConfigApi';
import { PasswordManageMent, PasswordManageMentData } from 'src/app/model/response/password-management';
import { IterableChangeRecord_ } from '@angular/core/src/change_detection/differs/default_iterable_differ';
import { ThrowStmt } from '@angular/compiler';
import { UtilProvider } from 'src/app/share/util';

@Component({
  selector: 'app-manage-password',
  templateUrl: './manage-password.component.html',
  styleUrls: ['./manage-password.component.css']
})
export class ManagePasswordComponent implements OnInit {

  password: PasswordManageMent;
  err: string = '';
  passwordData: PasswordManageMentData = new PasswordManageMentData();
  constructor(public api: ApiProvider,
    public util: UtilProvider,
    public data: DataProvider) {
    this.data.page = 'manage-password';

  }

  ngOnInit() {
    let data = {
      key: "personId",
      value: '1'
    }
    this.api.SendRequestApi(`${ConfigAPI.GetPasswordManagement}?personId=${this.data.userData.data[0].PersonId}&token=${this.util.GetAccessToken()}`).then((res: any) => {
      this.data.allPassword = res;
      this.data.password = res.data;
      for(let i in this.data.password){
        this.data.password[i].id = parseInt(i)+1; 
      }
    });
  }
  Validate() {
    if (this.passwordData.OldPassword == '' || this.passwordData.OldPassword == undefined) {

      this.err = 'oldpassword';
      return false;
    }
    if (this.passwordData.NewPassword == '' || this.passwordData.NewPassword == undefined) {
      this.err = 'newpassword';
      return false;

    }
    if (this.passwordData.ConfirmPassword == '' || this.passwordData.ConfirmPassword == undefined) {
      this.err = 'confirmpassword';
      return false;

    }

    return true;
  }
  SavePassword() {
    if (this.Validate()) {
      this.err = '';
      this.passwordData.CreateBy = this.data.userData.data[0].UserName;
      let data = "PasswordId=" + this.passwordData.PasswordId + "&ApplicationId=" + this.passwordData.ApplicationId + "&OldUsername=" + this.passwordData.OldUsername + "&NewUsername=" + this.passwordData.OldUsername + "&OldPassword=" + this.passwordData.OldPassword + "&NewPassword=" + this.passwordData.NewPassword + "&CreateBy=" + this.passwordData.CreateBy + "&IsActive=" + this.passwordData.IsActive + "&ApplicationName=" + this.passwordData.ApplicationName;
      this.api.SendRequestApiWithData(ConfigAPI.UpdatePasswordManagement, data).then((res: any) => {
        if (res.successful) {
          this.util.MessageSuccess(this.data.language);

        } else {
          this.util.MessageError(this.data.language);
        }
      }, (err) => {
        this.util.MessageError(this.data.language);

      });
    } else {
      if (this.err == 'oldpassword') {
        if (this.data.language == 'th') {
          this.util.MessageErrorText(this.data.language, "กรุณากรอกข้อมูลในช่องรหัสผ่านเก่า");

        } else {
          this.util.MessageErrorText(this.data.language, "Please input value Old Password field !");
        }
      }
      if (this.err == 'newpassword') {
        if (this.data.language == 'th') {
          this.util.MessageErrorText(this.data.language, "กรุณากรอกข้อมูลในช่องรหัสผ่านใหม่");

        } else {
          this.util.MessageErrorText(this.data.language, "Please input value New Password field !");
        }
      }
      if (this.err == 'confirmpassword') {
        if (this.data.language == 'th') {
          this.util.MessageErrorText(this.data.language, "กรุณากรอกข้อมูลในช่องยืนยันรหัสผ่าน");

        } else {
          this.util.MessageErrorText(this.data.language, "Please input value Confirm Password field !");
        }
      }

    }
  }
  Edit(item) {
    this.passwordData = item;
    console.log(this.passwordData);

  }
}
