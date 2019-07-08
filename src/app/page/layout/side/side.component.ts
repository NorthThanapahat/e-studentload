import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiProvider } from 'src/app/share/api/api';
import { ConfigAPI } from 'src/app/share/api/ConfigApi';
import { UtilProvider } from 'src/app/share/util';
import { DataProvider } from 'src/app/share/provider/provider';
import { AllPerson } from 'src/app/model/allperson';
import { Department } from 'src/app/model/request/department';
import { ModalManager } from 'ngb-modal';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {
  @ViewChild('myModal') myModal;
  private modalRef;
  image: any;
  allperson: AllPerson;
  persons: Array<any>;
  fullPerson: Array<any>;
  isInsert = false;
  getDepartment: any;
  allOrganization: any;
  department: Department = new Department();
  constructor(public api: ApiProvider,
    private modalService: ModalManager,
    public util: UtilProvider,
    public data: DataProvider) {
    this.data.page = 'department';

  }

  ngOnInit() {
    this.image = "assets/image/user.png";

    this.persons = [];
    this.GetDepartment();
    this.api.SendRequestApi(`${ConfigAPI.GetAllPerson}?token=${this.util.GetAccessToken()}`).then((res: any) => {
      this.allperson = <AllPerson>res;
      this.persons = res.data;
      for (let item of this.persons) {
        item.selected = false;
      }
      console.log(this.allperson);
      this.api.SendRequestApi(`${ConfigAPI.GetAllOrganization}?token=${this.util.GetAccessToken()}`).then((res: any) => {
        this.allOrganization = res;
        this.department.OrganizationId = this.allOrganization.data[0].OrganizationId;
      });
    });
  }
  GetDepartment() {
    this.api.SendRequestApi(`${ConfigAPI.GetAllDepartment}?token=${this.util.GetAccessToken()}`).then((res: any) => {
      if (res.successful) {
        this.data.allDepartment = res;
        this.data.department = res.data;
      } else {
        // if (res.code == '-2146233088') {
        //   this.util.DoError();
        // }
      }
    });
  }
  SelectOrganization(value) {
    console.log(value);
  }

  
  NewDepartment(){
    this.department = new Department();
    this.openModal();
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
  Edit(item) {
    
    this.isInsert = false;
    this.department.DepartmentId = item.DepartmentId;
    this.department.DepartmentName = item.DepartmentName;
    this.department.DepartmentPhone = item.DepartmentPhone;
    this.department.Detail = item.DepartmentDetail;
    this.department.Fname = item.Fname;
    this.department.OrganizationId = item.OrganizationId;
    this.openModal();
  }
  
  uploadFile(value) {
    this.department.DepartmentPhoto = value.target.value;
    console.log(this.department.DepartmentPhoto);
    this.util.readThis(value.target).onloadend = (e) => {
      this.image = e.target.result;
    };
  }
  DeleteDepartment(item) {
    this.department.DepartmentId = item.DepartmentId;
    this.department.DepartmentName = item.DepartmentName;
    this.department.Detail = item.DepartmentDetail;
  }
  SaveDeleteDepartment() {
    let data = "DepartmentId=" + this.department.DepartmentId + "&CreateBy=" + this.data.userData.data[0].UserId + "&IsActive=1";
   
    this.api.SendRequestApiWithData(ConfigAPI.DeleteDepartment, data).then((res: any) => {
      if (res.successful) {
        this.GetDepartment();
        this.api.InsertLog(this.data.userData.data[0].PersonId, 'Delete', "department");

        this.util.MessageSuccess(this.data.language);
      } else {
        this.util.MessageError(this.data.language);
      }
    }, (err) => {
      this.util.MessageError(this.data.language);
    });
  }
  Insert() {
    this.department = new Department();
    this.isInsert = true;
    this.openModal();
  }

  SaveOrganization() {
    this.CloseModal();
    let data = "DepartmentName=" + this.department.DepartmentName + "&DepartmentDetail=" + this.department.Detail + "&CreateBy=" + this.data.userData.data[0].UserId + "&IsActive=1" + "&OrganizationId=" + this.department.OrganizationId + "&DepartmentPhone=" + this.department.DepartmentPhone + "&DepartmentEmail=" + this.department.email;
    if (this.isInsert) {
      this.api.SendRequestApiWithData(ConfigAPI.InsertDepartment, data).then((res: any) => {
        if (res.successful) {
          // if (this.department.DepartmentPerson.length > 0) {
          //   for (let i in this.department.DepartmentPerson) {
          //     let data = "DepartmentId=" + res.data[0].DepartmentId + "&personId=" + this.department.DepartmentPerson[i].PersonId + "&CreateBy=" + this.data.userData.data[0].UserId + "&IsActive=1";
          //     this.api.SendRequestApiWithData(ConfigAPI.InsertDepartmentPerson, data).then((res: any) => {
          //       if (res.successful) {
          this.GetDepartment();
          this.api.InsertLog(this.data.userData.data[0].PersonId, 'Insert', "department");
          this.util.MessageSuccess(this.data.language);
        } else {
          this.util.MessageError(this.data.language);
        }
      }, (err) => {
        this.util.MessageError(this.data.language);

      });


    } else {
      let data = "DepartmentId=" + this.department.DepartmentId + "&DepartmentName=" + this.department.DepartmentName + "&DepartmentDetail=" + this.department.Detail + "&CreateBy=" + this.data.userData.data[0].UserId + "&IsActive=1" + "&OrganizationId=" + this.department.OrganizationId + "&DepartmentPhone=" + this.department.DepartmentPhone+"&DepartmentEmail="+this.department.email;

      this.api.SendRequestApiWithData(ConfigAPI.UpdateDepartment, data).then((res: any) => {
        if (res.successful) {
          // if (this.department.DepartmentPerson.length > 0) {
          //   for (let i in this.department.DepartmentPerson) {
          //     let data = "DepartmentId=" + this.department.DepartmentId + "&personId=" + this.department.DepartmentPerson[i].PersonId + "&CreateBy=" + this.data.userData.data[0].UserId + "&IsActive=1";
          //     this.api.SendRequestApiWithData(ConfigAPI.InsertDepartmentPerson, data).then((res: any) => {
          //       if (res.successful) {
          this.api.InsertLog(this.data.userData.data[0].PersonId, 'Update', "department");
          this.GetDepartment();
          this.util.MessageSuccess(this.data.language);
        } else {
          this.util.MessageError(this.data.language);
        }
        //   }, (err) => {
        //     this.util.MessageError(this.data.language);

        //   });
        // }
        //   } else {
        //     this.api.InsertLog(this.data.userData.data[0].PersonId, 'Update', "department");
        //     this.GetDepartment();
        //     this.util.MessageSuccess(this.data.language);
        //   }
        // }
      }, (err: any) => {
        console.log('Error===> ' + err);
        this.util.MessageError(this.data.language);
      });
    }

  }

  CloseModal(){
    this.modalService.close(this.modalRef);
  }
}
