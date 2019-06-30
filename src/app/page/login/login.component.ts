import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/share/provider/provider';
import { ApiProvider } from 'src/app/share/api/api';
import { ConfigAPI } from 'src/app/share/api/ConfigApi';
import { UserData } from 'src/app/model/response/user-data';
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

    let data = "grant_type=password&username=" + this.username + "&password=" + this.password + "&scope=uapi&client_id=111&client_secret=1234";
    this.api.SendRequestApiWithData(ConfigAPI.Login, data).then((res: any) => {
      this.loginService.GetUserInfo({ accesstoken: res.access_token }).subscribe((userinfoRes: any) => {
        console.log(userinfoRes);
        this.data.userData = <UserData>userinfoRes;
        this.util.SetUserInfo(this.data.userData);
        console.log(this.util.GetUserInfo());

        if (userinfoRes.successful) {
          localStorage.setItem('isLoggedin', 'true');
          this.util.SetAccessToken(res.access_token);
          this.router.navigate(['home']);
        }
      }, (err) => {

      });

      // this.data.userData = <UserData>res;
      // this.util.SaveUserInfo(res);
      // console.log(this.util.GetUserInfo());
      // if (this.data.userData.successful) {
      // }

    }, (err) => {
      if (this.data.language == 'en') {
        this.util.AlertMessage("Login Unsuccessful", "Username or Password is incorrect", {});

      } else if (this.data.language == 'th') {
        this.util.AlertMessage("ไม่สามารถเข้าสู่ระบบได้", "ชื่อผู้เข้าใช้งานหรือรหัสผ่านไม่ถูกต้อง", {});

      }
    });

  }

  SwitchLanguage(language) {
    this.util.SwitchLanguage(language, this.data, this.translate);
    console.log(this.data.language);
  }

}
