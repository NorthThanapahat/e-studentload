import { Component, OnInit } from '@angular/core';
import { ApiProvider } from 'src/app/share/api/api';
import { ConfigAPI } from 'src/app/share/api/ConfigApi';
import { UtilProvider } from 'src/app/share/util';
import { DataProvider } from 'src/app/share/provider/provider';
import { AllPerson } from 'src/app/model/allperson';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

  image: any;
  allperson: AllPerson;
  departmentName: string;
  organizationName: string;
  detail: string;
  photo: string;
  getDepartment: any;
  internalPhone:string;
  personSelect: Array<any> = [];
  constructor(public api: ApiProvider,
    public util: UtilProvider,
    public data: DataProvider) { }

  ngOnInit() {
    this.image = "assets/image/user.png";

    this.personSelect = [];

    this.api.SendRequestApi(ConfigAPI.GetAllDepartment).then((res: any) => {
      this.getDepartment = res;
    });

    this.api.SendRequestApi(ConfigAPI.GetAllPerson).then((res: any) => {
      this.allperson = <AllPerson>res;
      console.log(this.allperson);
    });
  }
  AddPerson(item) {
    this.personSelect.push(item);
  }
  Edit(item) {
    this.departmentName = item.DepartmentName;
    this.detail = item.DepartmentDetail;

  }
  DeletePerson(item, i) {
    console.log(i);
    this.personSelect.splice(i, 1);
    console.log(this.personSelect);
  }
  uploadFile(value) {
    this.photo = value.target.value;
    console.log(this.photo);
    this.util.readThis(value.target).onloadend = (e) => {
      this.image = e.target.result;
    };
  }
  Insert() {
    this.photo = '';
    this.personSelect = [];
    this.departmentName = '';
    this.detail = '';
  }
}
