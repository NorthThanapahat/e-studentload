import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/share/provider/provider';
import { ApiProvider } from 'src/app/share/api/api';
import { ConfigAPI } from 'src/app/share/api/ConfigApi';
import { UserData, PermissionMenu } from 'src/app/model/response/user-data';
import { UtilProvider } from 'src/app/share/util';
import { TranslateService } from '@ngx-translate/core';
import { ThailandData } from 'src/app/constant/ThailandData';
import { LoginPageService } from 'src/app/share/login-page/login-page.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(private dialog: MatDialog,
    public api: ApiProvider,
    public translate: TranslateService,
    public util: UtilProvider,
    public loginService: LoginPageService,
    public data: DataProvider, public router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('language') == 'th' || localStorage.getItem('language') == 'en') {
      this.translate.use(localStorage.getItem('language'));
      this.data.language = localStorage.getItem('language');
    }
  }
  Login() {

    // let param = [{
    //   key: 'username',
    //   value: this.username
    // },
    // {
    //   key: 'password',
    //   value: this.password
    // }]

    this.util.ShowLoading();
    let data = "grant_type=password&username=" + this.username + "&password=" + this.password + "&scope=uapi&client_id=111&client_secret=1234";
    this.api.SendRequestApiWithData(ConfigAPI.Login, data).then((res: any) => {
      this.loginService.GetUserInfo({ accesstoken: res.access_token }).subscribe((userinfoRes: any) => {
        console.log(userinfoRes);



        if (userinfoRes.successful) {
          this.data.userData = <UserData>userinfoRes;
          this.data.userData.data[0].password = this.password;
          this.util.SetAccessToken(res.access_token);
          this.data.userData.data[0].PermissionMenu = new PermissionMenu();
          this.data.userData.data[0].PermissionMenu.PermissionMenuList = [];

          this.api.SendRequestApi(`${ConfigAPI.GetPermissionManage}?PermissionId=${this.data.userData.data[0].PermissionId}`).then((res: any) => {
            this.util.HideLoading();

            if (res.successful) {
              localStorage.setItem('isLoggedin', 'true');
              this.data.userData.data[0].Permission = res.data;
              for (let item of res.data) {
                console.log(item.ApplicationId);
                if (item.ApplicationId == '1' || item.ApplicationId == '2' || item.ApplicationId == '3' || item.ApplicationId == '4' || item.ApplicationId == '5' || item.ApplicationId == '6' || item.ApplicationId == '7' || item.ApplicationId == '8' || item.ApplicationId == '9' || item.ApplicationId == '10' || item.ApplicationId == '11') {
                  let menu = ''
                  if (item.ApplicationId == '1') {
                    menu = 'application';
                    this.data.userData.data[0].PermissionMenu.hasApplication = true;
                    this.data.applicationPermission = item;
                  }
                  if (item.ApplicationId == '2') {
                    menu = 'person';
                    this.data.userData.data[0].PermissionMenu.hasPerson = true;
                    this.data.personPermission = item;
                  }
                  if (item.ApplicationId == '3') {
                    menu = 'organization';
                    this.data.userData.data[0].PermissionMenu.hasOrganization = true;
                    this.data.organizationPermission = item;

                  }
                  if (item.ApplicationId == '4') {
                    menu = 'department';
                    this.data.userData.data[0].PermissionMenu.hasDepartment = true;
                    this.data.departmentPermission = item;

                  }
                  if (item.ApplicationId == '5') {
                    menu = 'group';
                    this.data.userData.data[0].PermissionMenu.hasGroup = true;
                    this.data.groupPermission = item;
                  }
                  if (item.ApplicationId == '6') {
                    menu = 'dashboard';
                    this.data.userData.data[0].PermissionMenu.hasDashboard = true;
                    this.data.dashboardPermission = item;
                  }
                  if (item.ApplicationId == '7') {
                    menu = 'changepassword';
                    this.data.userData.data[0].PermissionMenu.hasChangePassword = true;
                    this.data.changePasswordPermission = item;
                  }
                  if (item.ApplicationId == '8') {
                    menu = 'passwordmanage';
                    this.data.userData.data[0].PermissionMenu.hasPasswordManage = true;
                    this.data.passwordManagePermission = item;
                  }
                  if (item.ApplicationId == '9') {
                    this.data.userData.data[0].PermissionMenu.hasBackUp = true;
                    this.data.backupPermission = item;
                  }
                  if (item.ApplicationId == '10') {
                    menu = 'permission';
                    this.data.userData.data[0].PermissionMenu.hasPermission = true;
                    this.data.permissionPermission = item;
                  }
                  if (item.ApplicationId == '11') {
                    menu = 'auditlog';
                    this.data.userData.data[0].PermissionMenu.hasAuditLog = true;
                    this.data.auditlogPermission = item;

                  }
                  this.data.userData.data[0].PermissionMenu.PermissionMenuList.push({ ApplicationId: item.ApplicationId, Menu: menu, itemPermission: item });
                }
              }

              this.util.SetUserInfo(this.data.userData);
              console.log(this.util.GetUserInfo());
              this.router.navigate(['home']);
            } else {
              this.util.HideLoading();
              this.util.MessageError(this.data.language);

            }
          }, (err) => {
            this.util.HideLoading();
            this.util.MessageError(this.data.language);
          });
        } else {
          this.util.HideLoading();
          this.util.MessageError(this.data.language);
        }
      }, (err) => {
        this.util.HideLoading();
        this.util.MessageError(this.data.language);

      });

      // this.data.userData = <UserData>res;
      // this.util.SaveUserInfo(res);
      // console.log(this.util.GetUserInfo());
      // if (this.data.userData.successful) {
      // }

    }, (err) => {
      this.util.HideLoading();
      this.util.MessageError(this.data.language);

    });

  }

  SwitchLanguage(language) {
    this.util.SwitchLanguage(language, this.data, this.translate);
    console.log(this.data.language);
  }

}
