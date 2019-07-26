import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiProvider } from 'src/app/share/api/api';
import { ConfigAPI } from 'src/app/share/api/ConfigApi';
import { AllPerson } from 'src/app/model/allperson';
import { ContactItemPerson } from 'src/app/model/contactPerson';
import { Person } from 'src/app/model/InsertPerson';
import { UtilProvider } from 'src/app/share/util';
import { MatDialog } from '@angular/material';
import { LoadingComponent } from 'src/app/modal/loading/loading.component';
import { DataProvider } from 'src/app/share/provider/provider';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalManager } from 'ngb-modal';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';
import { ExcelService } from '../dashboard/exportAsExcelFile';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  @ViewChild('myModal') myModal;
  @ViewChild('permissionModal') permissionModal;
  private modalRef;
  private modalRefPermission;

  getDepartment: any;
  person: Person = new Person();
  contactList: Array<ContactItemPerson> = []
  files: any;
  arrayBuffer: any;
  file: File;
  excelJson: Array<any>;
  contactItem: ContactItemPerson;
  contact: any;
  contactType: string;
  contactDiscription: string;
  importance: string;
  image: any;
  isInsert: boolean = false;
  error = '';
  deletePerson: Person;
  permission: any;
  isExcelImport = false;
  page = 1;
  pageSize = 10;
  permissionSelect: string;
  totalItem: any;
  previousPage: any;
  isUserprofile: false;
  err = {
    userId: false,
    preName: false,
    Fname: false,
    Lname: false,
    phone: false,
    email: false,
    department: false,
    position: false,
    permission: false
  }
  constructor(public api: ApiProvider,
    public util: UtilProvider,
    public dialog: MatDialog,
    public excelService: ExcelService,
    private router: Router,
    private modalService: ModalManager,
    public data: DataProvider) {
    this.data.page = 'person';
    this.excelJson = [];

  }

  ngOnInit() {

    this.contactType = '1';
    this.importance = '1';
    this.image = "assets/image/user.png";
    this.api.SendRequestApi(`${ConfigAPI.GetDepartment}?token=${this.util.GetAccessToken()}`).then((res: any) => {
      if (res.successful) {
        this.getDepartment = res;
        console.log("this.getDepartment", this.getDepartment);
      } else {
        // if (res.code == '-2146233088') {
        //   this.util.DoError();
        // }
      }
    }, (err) => {
      this.util.DoError();
    });
    console.log(this.person);
    this.GetAllPerson();
    this.GetAllpermission();

  }
  LoadPage(page) {
    console.log(page)
    if (page !== this.previousPage) {

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
  openPermissionModal() {
    this.modalRefPermission = this.modalService.open(this.permissionModal, {
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
  SavePermission() {
    this.modalService.close(this.modalRefPermission);
    this.util.ShowLoading();
    console.log('excelJson=>', this.excelJson);
    if (this.permissionSelect == '') {
      this.err.permission = true;
    } else {
      for (let i in this.excelJson) {
        if (this.excelJson[i].PersonId != undefined) {
          this.person.PersonId = this.excelJson[i].PersonId;
          this.isInsert = false;
        } else {
          this.isInsert = true;
        }
        // this.image = "assets/image/user.png";
        this.person = new Person();

        this.person.UserId = this.excelJson[i].UserId;
        this.person.PreName = this.excelJson[i].Title;
        this.person.Fname = this.excelJson[i].Fname;
        this.person.Lname = this.excelJson[i].Lname;
        this.person.Phone = this.excelJson[i].Offi_tel;
        this.person.Position = this.excelJson[i].Position;
        this.person.Depart = this.excelJson[i].Depart;
        this.person.PermissionId = this.permissionSelect;
        this.person.Email = this.excelJson[i].Email;
        if (this.excelJson[i].Staff_status != undefined)
          this.person.Staff_status = this.excelJson[i].Staff_status;
        else
          this.person.Staff_status = '';
        var url = '';
        var data = ``;
        if (this.isInsert) {
          url = ConfigAPI.InsertPerson;
          data = "userId=" + this.person.UserId +
            "&title=" + this.person.PreName +
            "&Fname=" + this.person.Fname +
            "&Lname=" + this.person.Lname +
            "&offi_tel=" + this.person.Phone +
            "&position=" + this.person.Position +
            "&depart=" + this.person.Depart +
            "&email=" + this.person.Email +
            "&PermissionId=" + this.person.PermissionId
        } else {
          data = "PersonId=" + this.person.PersonId +
            "&userId=" + this.person.UserId +
            "&title=" + this.person.PreName +
            "&Fname=" + this.person.Fname +
            "&Lname=" + this.person.Lname +
            "&offi_tel=" + this.person.Phone +
            "&position=" + this.person.Position +
            "&depart=" + this.person.Depart +
            "&email=" + this.person.Email +
            "&PermissionId=" + this.person.PermissionId
        }
        var err = false;
        this.api.SendRequestApiWithData(url, data).then((res: any) => {
          console.log(res);
          if (res.successful) {
            if (this.isInsert) {
              this.api.InsertLog(this.data.userData.data[0].PersonId, 'Insert', "person");

            } else {
              this.api.InsertLog(this.data.userData.data[0].PersonId, 'Update', "person");

            }
            if (i == (this.excelJson.length - 1).toString()) {
              this.util.HideLoading();
              this.util.MessageSuccess(this.data.language);
              this.GetAllPerson();
            }

          } else {
            err = true;
            if (i == (this.excelJson.length - 1).toString()) {
              if (err) {
                this.util.HideLoading();
                this.util.MessageError(this.data.language);
              }
            }
          }
        }, (err: any) => {
          err = true;
          if (i == (this.excelJson.length - 1).toString()) {
            if (err) {
              this.util.HideLoading();
              this.util.MessageError(this.data.language);
            }
          }
        });
      }

    }

  }
  CloseModal() {
    this.modalService.close(this.modalRef);
  }

  ClosePermissionModal() {
    this.modalService.close(this.modalRefPermission);
  }
  GetAllPerson() {
    this.api.SendRequestApi(`${ConfigAPI.GetAllPerson}?token=${this.util.GetAccessToken()}`).then((res: any) => {
      if (res.successful) {
        this.data.allPerson = res;
        this.data.persons = res.data;
        if (this.data.UserItem != undefined) {
          if (this.data.UserItem.id != '') {
            for (let item of this.data.persons) {
              if (item.PersonId == this.data.UserItem.id) {
                this.contactList = [];
                this.image = "assets/image/user.png";
                this.isInsert = false;
                this.DefaultError();
                this.SetData(item);
                this.openModal();
                this.isExcelImport = false;
              }
            }
          }
        }

      } else {
        // if (res.code == '-2146233088') {
        //   this.util.DoError();
        // }
      }
    }, (err) => {
      this.util.MessageError(this.data.language);
      this.router.navigate(['/login']);
    });
  }

  GetAllpermission() {
    this.api.SendRequestApi(`${ConfigAPI.GetAllpermission}?token=${this.util.GetAccessToken()}`).then((res: any) => {
      console.log(res);

      if (res.successful) {

        this.permission = res.data;
      } else {
        // if (res.code == '-2146233088') {
        //   this.util.DoError();
        // }
      }
    });
  }
  DefaultError() {
    this.err.userId = false;
    this.err.preName = false;
    this.err.Fname = false;
    this.err.Lname = false;
    this.err.phone = false;
    this.err.email = false;
    this.err.department = false;
    this.err.position = false;
    this.err.permission = false;
  }
  SavePerson() {

    if (this.person.UserId == '') {
      this.err.userId = true;
    }
    if (this.person.PreName == '') {
      this.err.preName = true;
    }
    if (this.person.Fname == '') {
      this.err.Fname = true;
    }

    if (this.person.Lname == '') {
      this.err.Lname = true;
    }
    if (this.person.Phone == '') {
      this.err.phone = true;
    }

    if (this.person.Email == '') {
      this.err.email = true;
    }

    if (this.person.Depart == '') {
      this.err.department = true;
    }

    if (this.person.Position == '') {
      this.err.position = true;
    }

    if (this.person.PermissionId == '') {
      this.err.permission = true;
    }
    if (this.person.UserId != '' && this.person.PermissionId != '' && this.person.PreName != '' && this.person.Fname != '' && this.person.Lname != '' && this.person.Phone != '' && this.person.Email != '' && this.person.Depart != '' && this.person.Position != '') {
      if (!this.isExcelImport) {
        this.CloseModal();
      }
      this.DefaultError();

      if (this.isInsert) {
        this.SendSavePerson(ConfigAPI.InsertPerson,
          "userId=" + this.person.UserId +
          "&title=" + this.person.PreName +
          "&Fname=" + this.person.Fname +
          "&Lname=" + this.person.Lname +
          "&offi_tel=" + this.person.Phone +
          "&position=" + this.person.Position +
          "&depart=" + this.person.Depart +
          "&email=" + this.person.Email +
          "&PermissionId=" + this.person.PermissionId);
      } else {
        this.SendSavePerson(ConfigAPI.UpdatePerson,
          "PersonId=" + this.person.PersonId +
          "&userId=" + this.person.UserId +
          "&title=" + this.person.PreName +
          "&Fname=" + this.person.Fname +
          "&Lname=" + this.person.Lname +
          "&offi_tel=" + this.person.Phone +
          "&position=" + this.person.Position +
          "&depart=" + this.person.Depart +
          "&email=" + this.person.Email +
          "&PermissionId=" + this.person.PermissionId);
      }
    } else {
      if (this.isExcelImport) {
        this.util.MessageError(this.data.language);
      }
    }

    // let dataInsertPersonContact = "TypeContactId=" + this.contactList.PersonName + "&PathPhoto=" + this.person.PathPhoto + "&Position=" + this.person.Position + "&Depart=" + this.person.Depart + "&CreateBy=" + this.person.CreateBy + "&IsActive=" + this.person.IsActive + "&OldUsername=" + this.person.OldUsername + "&NewUsername=" + this.person.NewUsername + "&ApplicationId=" + this.person.ApplicationId + "&OldPassword=" + this.person.OldPassword + "&NewPassword=" + this.person.NewPassword;


  }

  KeyData(type) {
    console.log(type);
    if (type == 'userId') {
      if (this.person.UserId != '') {
        this.err.userId = false;
      }
    }
    if (type == 'preName') {
      if (this.person.PreName != '') {
        this.err.preName = false;
      }
    }
    if (type == 'Fname') {
      if (this.person.Fname != '') {
        this.err.Fname = false;
      }
    }
    if (type == 'Lname') {
      if (this.person.Lname != '') {
        this.err.Lname = false;
      }
    }
    if (type == 'phone') {
      if (this.person.Phone != '') {
        this.err.phone = false;
      }
    }
    if (type == 'email') {
      if (this.person.Email != '') {
        this.err.email = false;
      }
    }
    if (type == 'department') {
      if (this.person.Depart != '') {
        this.err.department = false;
      }
    }
    if (type == 'position') {
      if (this.person.Position != '') {
        this.err.position = false;
      }
    }
    if (type == 'permission') {
      if (this.person.PermissionId != '') {
        this.err.permission = false;
      }
    }
  }
  SendSavePerson(url, data) {

    this.api.SendRequestApiWithData(url, data).then((res: any) => {
      console.log(res);
      let data = {
        image: this.person.PathPhoto,
        PersonId: this.person.PersonId,
        IsActive: 1
      }
      // this.api.SendImagePostData(ConfigAPI.InsertImage, data).subscribe((resImage: any) => {
      //   console.log(resImage);
      // }, (err) => {

      // })
      if (res.successful) {
        this.util.MessageSuccess(this.data.language);
        this.GetAllPerson();
        if (this.isInsert) {
          this.api.InsertLog(this.data.userData.data[0].PersonId, 'Insert', "person");

        } else {
          this.api.InsertLog(this.data.userData.data[0].PersonId, 'Update', "person");
        }

      } else {
        this.util.MessageError(this.data.language);
      }
    }, (err: any) => {
      this.util.MessageError(this.data.language);
    });
  }


  InsertPerson() {
    this.isExcelImport = false;
    this.image = "assets/image/user.png";
    this.isInsert = true;
    this.contactList = [];
    this.person = new Person();
    this.person.Depart = this.getDepartment.data[0].departmentname;
    this.DefaultError();
    this.data.UserItem.isUserProfile = false;
    this.openModal();
    console.log(this.person);
  }

  SetData(item) {
    
    this.person = new Person();
    this.person.UserId = item.UserId;
    this.person.CreateBy = item.CreateBy;
    this.person.CreateDate = item.CreateDate;
    this.person.Depart = item.Depart;
    this.person.Email = item.Email;
    this.person.Fname = item.Fname;
    this.person.Lname = item.Lname;
    this.person.Phone = item.Offi_tel;
    this.person.PermissionId = item.PermissionId;
    this.person.PersonId = item.PersonId;
    this.person.Position = item.Position;
    this.person.Staff_status = item.Staff_status;
    this.person.Title = item.Title;
    this.person.PreName = this.person.Title;
    console.log(this.person);
  }

  EditPerson(item) {
    console.log(this.data.UserItem.isUserProfile)
    this.contactList = [];
    this.image = "assets/image/user.png";
    this.isInsert = false;
    this.data.UserItem.isUserProfile = false;
    this.DefaultError();
    this.SetData(item);
    this.openModal();
    this.isExcelImport = false;

  }

  SaveDeletePerson() {
    let data = `"staff_status="${this.person.Staff_status}&PersonId=${this.person.PersonId}`;


    this.api.SendRequestApiWithData(ConfigAPI.DeletePerson, data).then((res: any) => {
      console.log(res);
      if (res.successful) {
        this.api.InsertLog(this.data.userData.data[0].PersonId, 'Delete', "person");
        this.GetAllPerson();
      } else {
        this.util.MessageError(this.data.language);
      }
    }, (err: any) => {
      this.util.MessageError(this.data.language);

    });
  }
  DeletePerson(item) {
    this.person = new Person();
    this.SetData(item);
    console.log(this.deletePerson);
  }
  uploadFile(event) {
    console.log(event);
    this.person.PathPhoto = event.target.files[0];
    console.log(event.target.files[0]);

    // if (event.target.files && event.target.files[0]) {
    //   var reader = new FileReader();

    //   reader.onload = (event: ProgressEvent) => {
    //     this.image = (<FileReader>event.target).result;
    //     console.log(this.image);

    //   }

    //   reader.readAsDataURL(event.target.files[0]);
    // }

    this.util.readThis(event.target).onloadend = (e) => {
      console.log(e.target.value);
      console.log(e);
      this.image = e.target.result;
    };
  }
  ImportExcel(event) {
    this.isExcelImport = true;

    console.log(this.files);
    console.log(event);
    console.log(event.target.files[0]);

    this.file = event.target.files[0];
    let fileReader = new FileReader();
    var excelJsonObject = [];
    fileReader.onload = (e: any) => {
      console.log(e);
      var fileData = e.target.result;
      console.log(fileData);
      var data = new Uint8Array(fileData);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      workbook.SheetNames.forEach(function (SheetName) {
        var rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[SheetName]);
        excelJsonObject = rowObject;
      });
      this.excelJson = excelJsonObject;
      console.log(excelJsonObject);



      this.openPermissionModal();
      this.files = '';
    }
    fileReader.readAsArrayBuffer(this.file);
  }
  ExportExcel() {
    let data: Array<Person> = [];
    data = Object.assign([], this.data.persons);
    console.log(this.data.persons);
    console.log(data);
    for (let item of data) {
      delete item.CreateDate;
      delete item.CreateBy;
      delete item.PermissionId;
      delete item.IsActive;
    }
    this.excelService.exportAsExcelFile(data, "PersonExport_");
  }

  SetActiveItem(index) {
    console.log("SetActiveItem==>", index);
    console.log("SetActiveItem==>", this.contactList[index]);
    if (this.contactList[index].IsActive == '1') {
      this.contactList[index].IsActive = '0';
    } else {
      this.contactList[index].IsActive = '1';
    }
  }
}
