import { Component, OnInit, NgModule } from '@angular/core';
import { ApiProvider } from 'src/app/share/api/api';
import { UtilProvider } from 'src/app/share/util';
import { ConfigAPI } from 'src/app/share/api/ConfigApi';
import { URLSearchParams } from 'url';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/share/provider/provider';
import { TranslateService } from '@ngx-translate/core';

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

  application: any;
  auditLog: any;
  applicationFormGroup: FormGroup;
  image: string | ArrayBuffer;
  path: string;

  constructor(public api: ApiProvider,
    public util: UtilProvider,
    private formBuilder: FormBuilder,
    public data: DataProvider,
    public translate: TranslateService) { }

  ngOnInit() {
    this.applicationFormGroup = this.formBuilder.group({
      applicationName: ['', Validators.required],
      linkUrl: ['', Validators.required],
      details: ['', Validators.required],
      file: ['', Validators.required],
    });
    setTimeout(() => {
      this.util.ShowLoading();
      // this.util.AlertMessage('เพิ่มข้อมูลสำเร็จ','ApplicationId : '+"asd");
      this.GetAllApplication();

    }, 200);

    let param = {
      key: "personid",
      value: "1"
    }
    this.api.SendGetRequestApiWithParam(ConfigAPI.GetAuditLog, param).then((res: any) => {
      this.auditLog = res;
    })
  }



  GetAllApplication() {
    let param = {
      key: "personid",
      value: "1"
    }
    this.api.SendGetRequestApiWithParam(ConfigAPI.GetApplication, param).then((res: any) => {
      this.application = res;
      this.util.HideLoading();
      // this.util.HideLoading();
    }, (err) => {
      console.log("err===>", err);
      this.util.HideLoading();
    });
  }
  processFile(value) {
    console.log(value);
    this.path = value.target.value;
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

    // const formData = new FormData();
    // formData.append('ApplicationName', this.applicationFormGroup.controls['applicationName'].value);
    // formData.append('LinkURL', this.applicationFormGroup.controls['linkUrl'].value);
    // formData.append('File', this.image.toString());
    // formData.append('CreateBy', '1');
    // formData.append('IsActive', '1');

    const data = "ApplicationName=" + this.applicationFormGroup.controls['applicationName'].value +
      "&LinkURL=" + this.applicationFormGroup.controls['linkUrl'].value +
      "&File" + this.path +
      "&Detail" + this.applicationFormGroup.controls['details'].value +
      "&CreateBy=" + 1 +
      "&IsActive=" + 1;
    this.util.ShowLoading();
    this.api.SendRequestApiWithData(ConfigAPI.InsertApplication, data).then((res: any) => {
      console.log(res);
      if (res.successful) {
        this.GetAllApplication();
        if(this.data.language == 'th'){
          this.util.AlertMessage('เพิ่มข้อมูลสำเร็จ', 'ApplicationId : ' + res.data[0].ApplicationId);

        }else if(this.data.language == 'en'){
          this.util.AlertMessage('Insert Data Successed', 'ApplicationId : ' + res.data[0].ApplicationId);
        }
      } else {
        if (this.data.language == 'th') {
          this.util.AlertMessage('เพิ่มข้อมูลไม่สำเร็จ', 'กรุณาตรวจสอบอีกครั้ง');

        }else if(this.data.language == 'en'){
          this.util.AlertMessage('Insert Data Incomplete !', 'Please try again.');

        }
      }
    }, (err) => {
      this.util.HideLoading();
    });
  }

  Delete(applicationId, isActive) {
    let data = "ApplicationId=" + applicationId + "&IsActive=" + isActive;

    this.api.SendPutRequestApiWithData(ConfigAPI.DeleteApplication, data).then((res: any) => {
      console.log(res);
      if (res.successful) {
        this.GetAllApplication();
      } else {

      }
    });
  }

  Update() {
    const data = "ApplicationName=" + this.applicationFormGroup.controls['applicationName'].value +
      "&LinkURL=" + this.applicationFormGroup.controls['linkUrl'].value +
      "&File" + this.image.toString() +
      "&Detail" + this.applicationFormGroup.controls['details'].value +
      "&CreateBy=" + 1 +
      "&IsActive=" + 1;

    this.api.SendRequestApiWithData(ConfigAPI.UpdateApplication, data).then((res: any) => {
      console.log(res);
      if (res.successful) {
        this.GetAllApplication();
      } else {

      }
    });
  }
}
