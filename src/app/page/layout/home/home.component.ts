import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { ApiProvider } from 'src/app/share/api/api';
import { UtilProvider } from 'src/app/share/util';
import { ConfigAPI } from 'src/app/share/api/ConfigApi';
import { URLSearchParams } from 'url';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/share/provider/provider';
import { TranslateService } from '@ngx-translate/core';
import { Application } from 'src/app/model/request/application';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/share/api/home-service/home-service';
import { ModalManager } from 'ngb-modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HomeComponent implements OnInit {
  @ViewChild('myModal') myModal;
  @ViewChild('passwordModal') passwordModal;
  private modalRef;
  newPassword: string = '';
  confirmPassword: string = '';
  isInsert = false;
  application: any;
  auditLog: any;
  image: string | ArrayBuffer;
  path: string;
  deleteApplication: any;
  applicationItem: Application = new Application();
  newsString: string;
  newsList = [];
  err = {
    isErr: false,
    newPassword: false,
    confirmPassword: false,
    application: {
      isErr: false,
      applicationName: false,
      applicationLink: false,
      applicationId: false,
      applicationDetails: false,
      applicationFile: false
    }
  }
  constructor(public api: ApiProvider,
    public util: UtilProvider,
    private formBuilder: FormBuilder,
    public data: DataProvider,
    private homeService: HomeService,
    public translate: TranslateService,
    private modalService: ModalManager,
    private router: Router) {
    this.data.page = 'application';

  }
  SavePassword() {
    if (this.newPassword == '') {
      this.err.newPassword = true;
      this.err.isErr = true;
    }
    if (this.confirmPassword == '') {
      this.err.confirmPassword = true;
      this.err.isErr = true;
    }

    if (!this.err.isErr) {
      if (this.newPassword === this.confirmPassword) {
        this.CloseModal();
        this.util.ShowLoading();
        let data = `UserId=${this.data.userData.data[0].UserId}&Password=${this.newPassword}`
        this.api.SendRequestApiWithData(ConfigAPI.UpdatePassword, data).then((res: any) => {
          this.util.HideLoading();

          if (res.successful)
            this.util.MessageSuccess(this.data.language);
        }, (err) => {
          this.util.HideLoading();

          this.util.MessageError(this.data.language);
        });
      } else {
        if (this.data.language == 'th') {
          this.util.AlertMessage('เกิดข้อผิดพลาด', 'ยืนยันรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง', {});

        } else if (this.data.language == 'en') {
          this.util.AlertMessage('Error !', 'Confirm Password Invalid', {});

        }
      }
    }
  }
  ngOnInit() {
    console.log(this.util.GetUserInfo());
    if (this.util.GetUserInfo() != undefined)
      this.data.userData = this.util.GetUserInfo();
    if (this.data.userData.data[0].Password == '') {
      this.openModalPassword();
    }
    setTimeout(() => {
      this.util.ShowLoading();
      // this.util.AlertMessage('เพิ่มข้อมูลสำเร็จ','ApplicationId : '+"asd");
      this.GetAllApplication();
      this.GetNews();
    }, 200);



  }

  GetNews() {
    this.api.SendRequestApi(`${ConfigAPI.GetNews}?token=${this.util.GetAccessToken()}`).then((res: any) => {
      console.log(res);
      if (res.successful) {
        let today = new Date()
        for (let itemNews of res.data) {
          let StrDate = new Date(itemNews.StrDate);
          let EndDate = new Date(itemNews.EndDate);
          // console.log(new Date(itemNews.StrDate));
          if (today >= StrDate && today <= EndDate) {
            this.newsList.push({ Topic: itemNews.TopicNew, Content: itemNews.DetailNew });
          }
        }
        if (this.newsList.length > 0){
          this.newsString = this.newsList[0].Topic + '=> ' + this.newsList[0].DetailNew;
          setInterval(() => {
            for (let i = 1; i < this.newsList.length; i++) {
              this.newsString = this.newsList[i].Topic + '=> ' + this.newsList[i].DetailNew;
            }
          }, 5000)
        }
        
      }
    }, (err) => {

    })
  }

  SendGetService(item){
    console.log(item);
    if(item.ApplicationId == '82' ){
      this.api.SendRequestApi(`http://192.168.100.11:8080/ESUPTMP/ESUPLogin/ESUADPass.jsp?userAD=${this.data.userData.data[0].UserId}&token=${this.util.GetAccessToken()}`).then((res:any)=>{
        console.log(res);
      },(err)=>{
        console.log(err);
      });
    }
    if(item.ApplicationId == '82' ){
      this.api.SendRequestApi(`http://192.168.100.11:8080/SLFUSER/jsp/SLFADPass.jsp?userAD=${this.data.userData.data[0].UserId}&token=${this.util.GetAccessToken()}`).then((res:any)=>{
        console.log(res);
      },(err)=>{
        console.log(err);
      });
    }
    if(item.ApplicationId == '84'){
      this.api.SendRequestApi(`https://192.168.43.1:8443/SLFApp/ADPass.jsp?userAD=${this.data.userData.data[0].UserId}&AppId=${item.ApplicationId}&token=${this.util.GetAccessToken()}`).then((res:any)=>{
        console.log(res);
      },(err)=>{
        console.log(err);
      });

    }
  }
  openModalPassword() {
    this.modalRef = this.modalService.open(this.passwordModal, {
      size: "lg",
      modalClass: 'mymodal',
      hideCloseButton: true,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: false,
      backdropClass: "modal-backdrop"
    })
  }
  GetAllApplication() {

    let data = {
      personid: this.data.userData.data[0].PersonId,
      accesstoken: this.util.GetAccessToken()
    }
    this.homeService.GetApplication(data).subscribe((res: any) => {
      this.util.HideLoading();

      console.log(res);
      if (res.successful) {

        this.application = res;
        this.data.allApplication = res;
        this.data.application = res.data;
      } else {
        // if (res.code == '-2146233088') {
        //   this.util.DoError();
        // }
      }

      // this.util.HideLoading();
    }, (err) => {
      console.log("err===>", err);
      this.util.HideLoading();
      this.util.Logout();
    });
  }
  processFile(value) {
    console.log(value);
    this.application = value.target.value;
    this.util.readThis(value.target).onloadend = (e) => {
      console.log(e.target.result);
      this.image = e.target.result;
    };
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      console.log(myReader.result);
      this.image = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.applicationItem.ApplicationName == '') {
      this.err.application.applicationName = true;
      this.err.application.isErr = true;
    }
    if (this.applicationItem.LinkURL == '') {
      this.err.application.applicationLink = true;
      this.err.application.isErr = true;
    }
    if (this.applicationItem.AppId == '') {
      this.err.application.applicationId = true;
      this.err.application.isErr = true;
    }
    if (this.applicationItem.Detail == '') {
      this.err.application.applicationDetails = true;
      this.err.application.isErr = true;
    }
    if (this.applicationItem.File == '') {
      this.err.application.applicationFile = true;
      this.err.application.isErr = true;
    }
    if (this.err.application.isErr) {
      this.modalService.close(this.modalRef);
      this.util.ShowLoading();
      console.log(this.isInsert);
      if (this.isInsert) {
        const data = "ApplicationName=" + this.applicationItem.ApplicationName +
          "&LinkURL=" + this.applicationItem.LinkURL +
          "&File" + this.path +
          "&Detail" + this.applicationItem.Detail +
          "&AppId=" + this.applicationItem.AppId +
          "&CreateBy=" + 1 +
          "&IsActive=" + 1

        this.api.SendRequestApiWithData(ConfigAPI.InsertApplication, data).then((res: any) => {
          console.log(res);
          if (res.successful) {
            this.api.InsertLog(this.data.userData.data[0].PersonId, 'Insert', "application");
            this.GetAllApplication();
            this.util.MessageSuccess(this.data.language)
          } else {
            this.util.MessageError(this.data.language);
          }
        }, (err) => {
          this.util.HideLoading();
          this.util.Logout();
          this.router.navigate(['/login']);
        });
      } else {
        const data = "ApplicationId=" + this.applicationItem.ApplicationId + "&ApplicationName=" + this.applicationItem.ApplicationName +
          "&LinkURL=" + this.applicationItem.LinkURL +
          "&File=" + this.path +
          "&AppId=" + this.application.AppId +
          "&Detail" + this.applicationItem.Detail +
          "&CreateBy=" + 1 +
          "&IsActive=" + 1

        this.api.SendRequestApiWithData(ConfigAPI.UpdateApplication, data).then((res: any) => {
          console.log(res);
          if (res.successful) {
            this.api.InsertLog(this.data.userData.data[0].PersonId, 'Update', "application");
            this.GetAllApplication();
            this.util.MessageSuccess(this.data.language)
          } else {
            this.util.MessageError(this.data.language);
          }
        }, (err) => {
          this.util.HideLoading();
          this.util.Logout();
          this.router.navigate(['/login']);
        });
      }
    }


  }
  openModal() {
    this.modalRef = this.modalService.open(this.myModal, {
      size: "lg",
      modalClass: 'mymodal',
      hideCloseButton: true,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop"
    })
  }

  CloseModal() {
    this.modalService.close(this.modalRef);
  }
  NewApplication() {
    this.isInsert = true;
    this.applicationItem = new Application();
    this.openModal();
  }

  Edit(applicaition) {
    this.path = '';
    this.isInsert = false;
    this.applicationItem = <Application>applicaition;
    this.openModal();
  }
  Delete(application) {
    this.deleteApplication = <Application>application;
  }

  ConfirmDelete() {
    let data = "ApplicationId=" + this.deleteApplication.ApplicationId + "&IsActive=1";

    this.api.SendRequestApiWithData(ConfigAPI.DeleteApplication, data).then((res: any) => {
      console.log(res);
      if (res.successful) {
        this.api.InsertLog(this.data.userData.data[0].PersonId, 'De;ete', "application");

        this.GetAllApplication();
        this.util.MessageSuccess(this.data.language);
      } else {
        this.util.MessageError(this.data.language);
      }
    }, (err) => {
      this.util.MessageError(this.data.language);
    });
  }


}
