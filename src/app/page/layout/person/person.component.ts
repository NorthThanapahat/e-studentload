import { Component, OnInit } from '@angular/core';
import { ApiProvider } from 'src/app/share/api/api';
import { ConfigAPI } from 'src/app/share/api/ConfigApi';
import { AllPerson } from 'src/app/model/allperson';
import { ContactItemPerson } from 'src/app/model/contactPerson';
import { Person } from 'src/app/model/InsertPerson';
import { UtilProvider } from 'src/app/share/util';
import { MatDialog } from '@angular/material';
import { LoadingComponent } from 'src/app/modal/loading/loading.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

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
  deletePerson:Person;
  constructor(public api: ApiProvider,
     public util: UtilProvider,
     public dialog: MatDialog) { }

  ngOnInit() {
    this.contactType = '1';
    this.importance = '1';
    this.image = "assets/image/user.png";
    this.api.SendRequestApi(ConfigAPI.GetDepartment).then((res: any) => {
      this.getDepartment = res;
      console.log("this.getDepartment", this.getDepartment);
    });
    console.log(this.person);
    this.GetAllPerson();

  }

  GetAllPerson() {
    this.api.SendRequestApi(ConfigAPI.GetAllPerson).then((res: any) => {
      this.allperson = <AllPerson>res;
      console.log(this.allperson);
    });
  }
  SavePerson() {

    let data = "PersonName=" + this.person.PersonName + "&PathPhoto=" + this.person.PathPhoto + "&PersonPosition=" + this.person.PersonPosition + "&PersonDepartment=" + this.person.PersonDepartment + "&CreateBy=" + this.person.CreateBy + "&IsActive=" + this.person.IsActive + "&OldUsername=" + this.person.OldUsername + "&NewUsername=" + this.person.NewUsername + "&ApplicationId=" + this.person.ApplicationId + "&OldPassword=" + this.person.OldPassword + "&NewPassword=" + this.person.NewPassword;
    // let dataInsertPersonContact = "TypeContactId=" + this.contactList.PersonName + "&PathPhoto=" + this.person.PathPhoto + "&PersonPosition=" + this.person.PersonPosition + "&PersonDepartment=" + this.person.PersonDepartment + "&CreateBy=" + this.person.CreateBy + "&IsActive=" + this.person.IsActive + "&OldUsername=" + this.person.OldUsername + "&NewUsername=" + this.person.NewUsername + "&ApplicationId=" + this.person.ApplicationId + "&OldPassword=" + this.person.OldPassword + "&NewPassword=" + this.person.NewPassword;
    
    if (this.isInsert) {
      this.SendSavePerson(ConfigAPI.InsertPerson, data);
    } else {
      this.SendSavePerson(ConfigAPI.UpdatePerson, data);
    }
  }
  ValidateInsertPerson() {
    if(this.person.NewUsername == '')
    {
      this.error = "newusername";
      return false;
    }
    if(this.person.NewPassword == ''){
      this.error = "newpassword";

      return false;
    }
    if(this.person.PersonName == ''){
      this.error = "personname";
      return false;

    }
    if (this.person.NewUsername == this.person.PersonConfirmPassword) {
      this.error = "newusername";
      return true;
    } 
  }
  SendSavePerson(url, data) {
    this.api.SendRequestApiWithData(url, data).then((res: any) => {
      console.log(res);
      if (res.successful) {
        this.GetAllPerson();
      } else {

      }
    });
  }


  InsertPerson() {
    this.isInsert = true;
    this.person = new Person();
    this.person.PersonDepartment = this.getDepartment.data[0].departmentname;

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
  EditPerson(item, index) {
    this.isInsert = false;
    this.person.PersonName = this.allperson.data[index].PersonName;
    this.person.PersonPosition = this.allperson.data[index].PersonPosition;
    this.person.PersonDepartment = this.allperson.data[index].PersonDepartment;
    this.person.PathPhoto = this.allperson.data[index].PathPhoto;
  }

  SaveDeletePerson(){
    let data = "CreateBy='"+this.deletePerson.CreateBy +"'&IsActive='"+this.deletePerson.IsActive+"'&PersonId='"+this.deletePerson.PersonId+"'&PersonContactId='1'"
    let formdata = new FormData();
    formdata.append("CreateBy",'1');
    formdata.append("IsActive","1");
    formdata.append("PersonId",this.deletePerson.PersonId);
    formdata.append("PersonContactId",'1');
    
    this.api.SendPutRequestApiWithData(ConfigAPI.DeletePerson, formdata).then((res: any) => {
      console.log(res);
      if (res.successful) {
        this.GetAllPerson();
      } else {

      }
    });
  }
  DeletePerson(item, index) {
    this.deletePerson = new Person();
    this.deletePerson.PersonName = item.PersonName;
    this.deletePerson.PersonDepartment = item.PersonDepartment;
    this.deletePerson.PersonPosition = item.PersonPosition;
    this.deletePerson.PersonDepartment = item.PersonDepartment;
    this.deletePerson.PersonId = item.PersonId;
    console.log(this.deletePerson);
  }
  uploadFile(value) {
    this.util.readThis(value.target).onloadend = (e) => {
      console.log(e.target.result);
      this.image = e.target.result;
      this.person.PathPhoto = this.image;
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
