import { Component, OnInit } from '@angular/core';
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
  deletePerson: Person;

  page = 1;
  pageSize = 10;
  totalItem: any;
  previousPage: any;

  constructor(public api: ApiProvider,
    public util: UtilProvider,
    public dialog: MatDialog,
    private router: Router,
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

    // let dataInsertPersonContact = "TypeContactId=" + this.contactList.PersonName + "&PathPhoto=" + this.person.PathPhoto + "&PersonPosition=" + this.person.PersonPosition + "&PersonDepartment=" + this.person.PersonDepartment + "&CreateBy=" + this.person.CreateBy + "&IsActive=" + this.person.IsActive + "&OldUsername=" + this.person.OldUsername + "&NewUsername=" + this.person.NewUsername + "&ApplicationId=" + this.person.ApplicationId + "&OldPassword=" + this.person.OldPassword + "&NewPassword=" + this.person.NewPassword;

    if (this.isInsert) {
      this.SendSavePerson(ConfigAPI.InsertPerson, "PersonName=" + this.person.PersonName + "&PathPhoto=" + this.person.PathPhoto + "&PersonPosition=" + this.person.PersonPosition + "&PersonDepartment=" + this.person.PersonDepartment + "&CreateBy=" + this.person.CreateBy + "&IsActive=" + this.person.IsActive + "&Username=" + this.person.NewUsername + "&ApplicationId=" + this.person.ApplicationId + "&Password=" + this.person.NewPassword + "&COnfirmPassword=" + this.person.PersonConfirmPassword);
    } else {
      // this.api.SendRequestApiWithData(ConfigAPI.UpdatePerson, "PersonName=" + this.person.PersonName + "&PathPhoto=" + this.person.PathPhoto + "&PersonPosition=" + this.person.PersonPosition + "&PersonDepartment=" + this.person.PersonDepartment + "&CreateBy=" + this.person.CreateBy + "&IsActive=" + this.person.IsActive + "&Username=" + this.person.NewUsername + "&ApplicationId=" + this.person.ApplicationId + "&Password=" + this.person.NewPassword + "&COnfirmPassword=" + this.person.PersonConfirmPassword).then((res: any) => {
      //   if (res.successful) {
      //     this.util.MessageSuccess(this.data.language);
      //   } else {
      //     this.util.MessageError(this.data.language);
      //   }
      // },(err:any)=>{
      //   this.util.MessageError(this.data.language);
      // });
      this.SendSavePerson(ConfigAPI.UpdatePerson, "PersonName=" + this.person.PersonName + "&PathPhoto=" + this.person.PathPhoto + "&PersonPosition=" + this.person.PersonPosition + "&PersonDepartment=" + this.person.PersonDepartment + "&CreateBy=" + this.person.CreateBy + "&IsActive=" + this.person.IsActive + "&Username=" + this.person.NewUsername + "&ApplicationId=" + this.person.ApplicationId + "&Password=" + this.person.NewPassword + "&ConfirmPassword=" + this.person.PersonConfirmPassword + "&PersonId=" + this.person.PersonId);

    }
  }
  ValidateInsertPerson() {
    if (this.person.NewUsername == '') {
      this.error = "newusername";
      return false;
    }
    if (this.person.NewPassword == '') {
      this.error = "newpassword";

      return false;
    }
    if (this.person.PersonName == '') {
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
        if (this.isInsert) {
          var err = false;
          for (let contactItem of this.contactList) {
            this.api.SendRequestApiWithData(ConfigAPI.InsertContactPerson,
              "TypeContactId=" + contactItem.TypeContactId +
              "&Importance=" + contactItem.Importance +
              "&Contact=" + contactItem.Contact +
              "&CreateBy=" + this.person.CreateBy +
              "&IsActive=" + this.person.IsActive +
              "&PersonId =" + this.person.PersonId).then((res: any) => {
                if (!res.successful) {
                  err = true;
                }
              });
          }

          if (err) {
            this.util.MessageError(this.data.language);
          } else {
            this.util.MessageSuccess(this.data.language);
            this.GetAllPerson();
          }

        } else {
          for (let contactItem of this.contactList) {
            this.api.SendRequestApiWithData(ConfigAPI.UpdateContactPerson,
              "TypeContactId=" + contactItem.TypeContactId +
              "&Importance=" + contactItem.Importance +
              "&Contact=" + contactItem.Contact +
              "&CreateBy=" + this.person.CreateBy +
              "&IsActive=" + this.person.IsActive +
              "&PersonId =" + this.person.PersonId).then((res: any) => {
                if (!res.successful) {
                  err = true;
                }
              });
          }

          if (err) {
            this.util.MessageError(this.data.language);
          } else {
            this.util.MessageSuccess(this.data.language);
            this.GetAllPerson();
          }
        }
      }
      else {
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
  EditPerson(item) {
    this.contactList = [];
    this.image = "assets/image/user.png";
    this.isInsert = false;
    this.person = item;
    this.person.CreateBy = 1;
    this.person.IsActive = 1;

  }

  SaveDeletePerson() {
    let data = "CreateBy=" + this.deletePerson.CreateBy + "&IsActive=" + this.deletePerson.IsActive + "&PersonId=" + this.deletePerson.PersonId + "&PersonContactId=1";


    this.api.SendRequestApiWithData(ConfigAPI.DeletePerson, data).then((res: any) => {
      console.log(res);
      if (res.successful) {
        this.GetAllPerson();
      } else {
        this.util.MessageError(this.data.language);
      }
    }, (err: any) => {
      this.util.MessageError(this.data.language);

    });
  }
  DeletePerson(item) {
    this.deletePerson = new Person();
    this.deletePerson = item;
    this.deletePerson.IsActive = 1;
    this.deletePerson.CreateBy = 1;
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
