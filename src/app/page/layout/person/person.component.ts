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
import { ExcelService } from '../dashboard/exportAsExcelFile';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  @ViewChild('myModal') myModal;
  private modalRef;

  allperson: AllPerson;
  getDepartment: any;
  person: Person = new Person();
  contactList: Array<ContactItemPerson> = []
  files:any;
  arrayBuffer: any;
  file: File;

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
  page = 1;
  pageSize = 10;
  totalItem: any;
  previousPage: any;
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
    public excelService:ExcelService,
    private router: Router,
    private modalService: ModalManager,
    public data: DataProvider) {
    this.data.page = 'person';

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
  CloseModal() {
    this.modalService.close(this.modalRef);
  }
  GetAllPerson() {
    this.api.SendRequestApi(`${ConfigAPI.GetAllPerson}?token=${this.util.GetAccessToken()}`).then((res: any) => {
      if (res.successful) {
        this.allperson = <AllPerson>res;
        this.data.allPerson = res;
        this.data.persons = res.data;
        console.log(this.allperson);
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
  SavePerson() {
    if (this.person.userId == '') {
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
    if (this.person.userId != '' && this.person.PermissionId != '' && this.person.PreName != '' && this.person.Fname != '' && this.person.Lname != '' && this.person.Phone != '' && this.person.Email != '' && this.person.Depart != '' && this.person.Position != '') {
      if (this.isInsert) {
        this.SendSavePerson(ConfigAPI.InsertPerson,
          "userId=" + this.person.userId +
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
          "&userId=" + this.person.userId +
          "&title=" + this.person.PreName +
          "&Fname=" + this.person.Fname +
          "&Lname=" + this.person.Lname +
          "&offi_tel=" + this.person.Phone +
          "&position=" + this.person.Position +
          "&depart=" + this.person.Depart +
          "&email=" + this.person.Email +
          "&PermissionId=" + this.person.PermissionId);
      }
    }

    // let dataInsertPersonContact = "TypeContactId=" + this.contactList.PersonName + "&PathPhoto=" + this.person.PathPhoto + "&Position=" + this.person.Position + "&Depart=" + this.person.Depart + "&CreateBy=" + this.person.CreateBy + "&IsActive=" + this.person.IsActive + "&OldUsername=" + this.person.OldUsername + "&NewUsername=" + this.person.NewUsername + "&ApplicationId=" + this.person.ApplicationId + "&OldPassword=" + this.person.OldPassword + "&NewPassword=" + this.person.NewPassword;


  }

  KeyData(type) {
    console.log(type);
    if (type == 'userId') {
      if (this.person.userId != '') {
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
    this.modalService.close(this.modalRef);
    this.api.SendRequestApiWithData(url, data).then((res: any) => {
      console.log(res);
      if (res.successful) {
        if (this.isInsert) {
          this.api.InsertLog(this.data.userData.data[0].PersonId, 'Insert', "person");

        } else {
          this.api.InsertLog(this.data.userData.data[0].PersonId, 'Update', "person");

        }
        this.util.MessageSuccess(this.data.language);
        this.GetAllPerson();
      } else {
        this.util.MessageError(this.data.language);
      }
    }, (err: any) => {
      this.util.MessageError(this.data.language);
    });
  }


  InsertPerson() {
    this.image = "assets/image/user.png";
    this.isInsert = true;
    this.contactList = [];
    this.person = new Person();
    this.person.Depart = this.getDepartment.data[0].departmentname;
    this.openModal();
    console.log(this.person);
  }
  AddContact() {
    this.contactItem = new ContactItemPerson();
    this.contactItem.TypeContactId = this.contactType;
    this.contactItem.Contact = this.contactDiscription;
    this.contactItem.Importance = this.importance;
    this.contactItem.CreateBy = "";
    this.contactItem.IsActive = "1";
    this.contactItem.PersonId = "1";
    this.contactList.push(this.contactItem);
    console.log(this.contactList);
  }
  SetData(item) {
    this.person = new Person();
    this.person.userId = item.UserId;
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
    if (item.Title === 'นาย') {
      this.person.PreName = 'mr';
    } else if (item.Title === 'นาง') {
      this.person.PreName = 'mrs';
    } else if (item.Title === 'นางสาว') {
      this.person.PreName = 'miss';
    }
    console.log(this.person);
  }
  EditPerson(item) {
    this.contactList = [];
    this.image = "assets/image/user.png";
    this.isInsert = false;
    this.SetData(item);
    this.openModal();
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
  uploadFile(value) {
    console.log(value);
    this.util.readThis(value.target).onloadend = (e) => {
      console.log(e.target.result);
      this.image = e.target.result;
      this.person.PathPhoto = value.target.value;
    };
  }
  ImportExcel(event) {
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
      console.log(excelJsonObject);

      if (excelJsonObject[0].Value == undefined) {
        this.isInsert = true;
      } else {
        this.isInsert = false;
        this.person.PersonId = excelJsonObject[0].Or;
      }
      this.image = "assets/image/user.png";
      this.person = new Person();

      this.person.userId = excelJsonObject[0].UserId;
      this.person.PreName = excelJsonObject[0].Title;
      this.person.Fname = excelJsonObject[0].Fname;
      this.person.Lname = excelJsonObject[0].Lname;
      this.person.Phone = excelJsonObject[0].Offi_tel;
      this.person.Position = excelJsonObject[0].Position;
      this.person.Depart = excelJsonObject[0].Depart;
      this.person.Email = excelJsonObject[0].Email;
      if (excelJsonObject[0].Staff_status != undefined)
        this.person.Staff_status = excelJsonObject[0].Staff_status;
      else
        this.person.Staff_status = '';

      this.openModal();
      this.files = '';
    }
    fileReader.readAsArrayBuffer(this.file);
  }
  ExportExcel(){
    this.excelService.exportAsExcelFile(this.data.persons,"PersonExport_");
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
