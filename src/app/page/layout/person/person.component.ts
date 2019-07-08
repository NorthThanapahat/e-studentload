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

  contactItem: ContactItemPerson;
  contact: any;
  contactType: string;
  contactDiscription: string;
  importance: string;
  image: any;
  isInsert: boolean = false;
  error = '';
  deletePerson: Person;

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
    position: false
  }
  constructor(public api: ApiProvider,
    public util: UtilProvider,
    public dialog: MatDialog,
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
  CloseModal(){
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

    if (this.person.userId != '' && this.person.PreName != '' && this.person.Fname != '' && this.person.Lname != '' && this.person.Phone != '' && this.person.Email != '' && this.person.Depart != '' && this.person.Position != '') {
      if (this.isInsert) {
        this.SendSavePerson(ConfigAPI.InsertPerson,
          "userId=" + this.person.userId +
          "&title=" + this.person.PreName +
          "&Fname=" + this.person.Fname +
          "&Lname=" + this.person.Lname +
          "&offi_tel=" + this.person.Phone +
          "&position=" + this.person.Depart +
          "&depart=" + this.person.Depart +
          "&email=" + this.person.Email +
          "&PermissionId="+this.data.userData.data[0].PermissionId+
          "&staff_status=''");
      } else {
        this.SendSavePerson(ConfigAPI.UpdatePerson,
          "PersonId="+this.person.PersonId+ 
          "&userId=" + this.person.userId +
          "&title=" + this.person.PreName +
          "&Fname=" + this.person.Fname +
          "&Lname=" + this.person.Lname +
          "&offi_tel=" + this.person.Phone +
          "&position=" + this.person.Depart +
          "&depart=" + this.person.Depart +
          "&email=" + this.person.Email +
          "&PermissionId="+this.data.userData.data[0].PermissionId+
          "&staff_status=''");
      }
    }

    // let dataInsertPersonContact = "TypeContactId=" + this.contactList.PersonName + "&PathPhoto=" + this.person.PathPhoto + "&Position=" + this.person.Position + "&Depart=" + this.person.Depart + "&CreateBy=" + this.person.CreateBy + "&IsActive=" + this.person.IsActive + "&OldUsername=" + this.person.OldUsername + "&NewUsername=" + this.person.NewUsername + "&ApplicationId=" + this.person.ApplicationId + "&OldPassword=" + this.person.OldPassword + "&NewPassword=" + this.person.NewPassword;


  }
  
  KeyData(type){
    console.log(type);
    if(type == 'userId'){
      if(this.person.userId != ''){
        this.err.userId = false;
      }
    }
    if(type == 'preName'){
      if(this.person.PreName != ''){
        this.err.preName = false;
      }
    }
    if(type == 'Fname'){
      if(this.person.Fname != ''){
        this.err.Fname = false;
      }
    }
    if(type == 'Lname'){
      if(this.person.Lname != ''){
        this.err.Lname = false;
      }
    }
    if(type == 'phone'){
      if(this.person.Phone != ''){
        this.err.phone = false;
      }
    }
    if(type == 'email'){
      if(this.person.Email != ''){
        this.err.email = false;
      }
    }
    if(type == 'department'){
      if(this.person.Depart != ''){
        this.err.department = false;
      }
    }
    if(type == 'position'){
      if(this.person.Position != ''){
        this.err.position = false;
      }
    }
  }
  SendSavePerson(url, data) {
    this.modalService.close(this.modalRef);
    this.api.SendRequestApiWithData(url, data).then((res: any) => {
      console.log(res);
      if (res.successful) {
        this.api.InsertLog(this.data.userData.data[0].PersonId, 'Insert', "person");
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
  SetData(item){
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
    if(item.Title === 'นาย'){
      this.person.PreName = 'mr';
    }else if(item.Title === 'นาง'){
      this.person.PreName = 'mrs';
    }else if(item.Title === 'นางสาว'){
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
