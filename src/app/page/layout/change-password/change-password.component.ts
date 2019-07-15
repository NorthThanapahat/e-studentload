import { Component, OnInit } from '@angular/core';
import { ApiProvider } from 'src/app/share/api/api';
import { UtilProvider } from 'src/app/share/util';
import { DataProvider } from 'src/app/share/provider/provider';
import { ConfigAPI } from 'src/app/share/api/ConfigApi';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  constructor(public api: ApiProvider,
    public util: UtilProvider,
    public data: DataProvider) {
    this.data.page = 'change-password';

  }

  ngOnInit() {
  }

  Save() {
    if (this.oldPassword == this.data.userData.data[0].password) {
      if (this.newPassword === this.confirmPassword) {
        let data = `UserId=${this.data.userData.data[0].UserId}&Password=${this.newPassword}`
        this.api.SendRequestApiWithData(ConfigAPI.UpdatePassword, data).then((res: any) => {
          if (res.successful)
            this.util.MessageSuccess(this.data.language);
        }, (err) => {
          this.util.MessageError(this.data.language);
        });
      } else {
        if (this.data.language == 'th')
          this.util.AlertMessage("ผิดพลาด", "ยืนยันรหัสผ่านไม่ถูกต้อง", {});
        else
          this.util.AlertMessage("Error", "Confirm Password is Invalid", {});
      }
    } else {
      if (this.data.language == 'th')
        this.util.AlertMessage("ผิดพลาด", "รหัสไม่ถูกต้อง", {});
      else
        this.util.AlertMessage("Error", "Password Invalid", {});
    }
  }

}
