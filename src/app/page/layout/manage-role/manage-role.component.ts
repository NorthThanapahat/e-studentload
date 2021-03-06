import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiProvider } from 'src/app/share/api/api';
import { DataProvider } from 'src/app/share/provider/provider';
import { UtilProvider } from 'src/app/share/util';
import { ConfigAPI } from 'src/app/share/api/ConfigApi';
import { ModalManager } from 'ngb-modal';
import { HomeService } from 'src/app/share/api/home-service/home-service';
import * as _ from 'lodash';
@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.css']
})
export class ManageRoleComponent implements OnInit {
  @ViewChild('myModal') myModal;
  private modalRef;
  application: any;
  applicationChecked: Array<any>;
  checkAll: boolean = false;
  permission: any;
  page = 1;
  pageSize = 10;
  totalItem: any;
  previousPage: any;
  isInsert = false;
  permissionItem: any = {
    id: '',
    name: '',
    status: ''
  };
  err: any = {
    name: false,
    status: false
  }
  constructor(
    public api: ApiProvider,
    private homeService: HomeService,
    public data: DataProvider,
    private modalService: ModalManager,
    public util: UtilProvider
  ) {
    this.data.page = 'manage-role';
    this.applicationChecked = [];
    this.GetAllApplication();
  }

  openModal() {
    for (let item of this.application) {
      item.isEditChecked = '0';
      item.isViewChecked = '0';
      item.isAddChecked = '0';
      item.isDeleteChecked = '0';
    }
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
  Check(event, item, type, index) {
    console.log("event Check=> ", event);
    console.log("item Check=> ", item);
    console.log("type Check=> ", type);
    if (type == 'checkAll') {
      // if (item.isViewChecked == '0' && item.isAddChecked == '0' && item.isEditChecked == '0' && item.isDeleteChecked == '0') {
      //   item.isEditChecked = '1';
      //   item.isViewChecked = '1';
      //   item.isAddChecked = '1';
      //   item.isDeleteChecked = '1';
      // }


      if (item.isViewChecked == '1' || item.isEditChecked == '1' || item.isAddChecked == '1' || item.isDeleteChecked == '1') {
        if (item.isAddChecked == '1' && item.isViewChecked == '1' && item.isEditChecked == '1' && item.isDeleteChecked == '1') {
          item.isViewChecked = '0';
          item.isEditChecked = '0';
          item.isAddChecked = '0';
          item.isDeleteChecked = '0';

        } else {
          item.isViewChecked = '1';
          item.isEditChecked = '1';
          item.isAddChecked = '1';
          item.isDeleteChecked = '1';
        }
      } else {
        item.isViewChecked = '1';
        item.isEditChecked = '1';
        item.isAddChecked = '1';
        item.isDeleteChecked = '1';
      }
      // else 

    } else if (type == 'view') {
      if (item.isViewChecked == '1')
        item.isViewChecked = '0';
      else
        item.isViewChecked = '1';
    } else if (type == 'edit') {
      if (item.isEditChecked == '1')
        item.isEditChecked = '0';
      else
        item.isEditChecked = '1';
    } else if (type == 'add') {
      if (item.isAddChecked == '1')
        item.isAddChecked = '0';
      else
        item.isAddChecked = '1';
    } else if (type == 'delete') {
      if (item.isDeleteChecked == '1')
        item.isDeleteChecked = '0';
      else
        item.isDeleteChecked = '1';
    }
    console.log(item);
  }

  GetAllApplication() {

    this.api.SendRequestApi(ConfigAPI.GetAllApplication).then((res: any) => {
      this.util.HideLoading();


      console.log(res);
      if (res.successful) {
        this.application = res.data;
        for (let item of this.application) {
          item.isEditChecked = '0';
          item.isViewChecked = '0';
          item.isAddChecked = '0';
          item.isDeleteChecked = '0';
        }
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
  CloseModal() {
    this.modalService.close(this.modalRef);
  }

  ngOnInit() {
    this.GetAllpermission();
  }
  GetAllpermission() {
    this.api.SendRequestApi(`${ConfigAPI.GetAllpermission}?token=${this.util.GetAccessToken()}`).then((res: any) => {
      console.log(res);

      if (res.successful) {
        this.data.allPermission = res;
        this.data.permission = res.data;
        this.permission = res;
      } else {
        // if (res.code == '-2146233088') {
        //   this.util.DoError();
        // }
      }
    });
  }
  SaveRole() {
    if (this.permissionItem.name == '') {
      this.err.name = true;
    }
    if (this.permissionItem.status == '') {
      this.err.status = true;
    }

    if (!this.err.name && !this.err.status) {
      if (this.isInsert) {
        let data = `PermissionName=${this.permissionItem.name}&IsActive=${this.permissionItem.status}&CreateBy=${this.data.userData.data[0].PersonId}`;
        this.api.SendRequestApiWithData(ConfigAPI.Insertpermission, data).then((res: any) => {
          console.log(res);
          var err = false;
          if (res.successful) {
            for (let item of this.application) {
              if (item.isViewChecked == '1' || item.isAddChecked == '1' || item.isEditChecked == '1' || item.isDeleteChecked == '1') {
                let data = `View=${item.isViewChecked}&Add=${item.isAddChecked}&Edit=${item.isEditChecked}&Delete=${item.isDeleteChecked}&Import=1&Export=0&IsActive=1&CreateBy=${this.data.userData.data[0].PersonId}&PermissionId=${res.data[0].PermissionId}&ApplicationId=${item.ApplicationId}`;
                this.api.SendRequestApiWithData(ConfigAPI.InsertpermissionManage, data).then((res: any) => {
                  if (res.successful) {
                    err = false;
                  } else {
                    err = true;
                  }
                }, (err) => {
                  this.util.MessageError(this.data.language);
                })
              }
            }
            if (err) {
              this.util.MessageError(this.data.language);
            } else {
              this.util.MessageSuccess(this.data.language);
              this.GetAllpermission();

            }

          }
        });
      } else {
        var err = false;
        for (let item of this.application) {
          if (item.PermissionManageId != undefined || (item.PermissionManageId == undefined && (item.isViewChecked == '1' || item.isAddChecked == '1' || item.isEditChecked == '1' || item.isDeleteChecked == '1'))) {
            if (item.PermissionManageId != undefined) {
              let data = `PermissionManageId = ${item.PermissionManageId}&ApplicationId=${item.ApplicationId}&View=${item.isViewChecked}&Import=1&Export=0&Add=${item.isAddChecked}&Edit=${item.isEditChecked}&Delete=${item.isDeleteChecked}&PermissionId=${this.permissionItem.id}&PermissionName=${this.permissionItem.name}&IsActive=${this.permissionItem.status}&CreateBy=${this.data.userData.data[0].PersonId}`;
              this.api.SendRequestApiWithData(ConfigAPI.Updatepermission, data).then((res: any) => {
                console.log(res);

                if (res.successful) {
                  err = false;
                } else {
                  err = true;
                }
              }, (err1) => {

              });
            } else if(item.PermissionManageId == undefined && (item.isViewChecked == '1' || item.isAddChecked == '1' || item.isEditChecked == '1' || item.isDeleteChecked == '1')){
              let data = `View=${item.isViewChecked}&Add=${item.isAddChecked}&Edit=${item.isEditChecked}&Delete=${item.isDeleteChecked}&Import=1&Export=0&IsActive=1&CreateBy=${this.data.userData.data[0].PersonId}&PermissionId=${this.permissionItem.id}&ApplicationId=${item.ApplicationId}`;
              this.api.SendRequestApiWithData(ConfigAPI.InsertpermissionManage, data).then((res: any) => {
                if (res.successful) {
                  err = false;
                } else {
                  err = true;
                }
              }, (err) => {
                this.util.MessageError(this.data.language);
              })
            }

          }
        }
        if (err) {
          this.util.MessageError(this.data.language);
        } else {
          this.util.MessageSuccess(this.data.language);
          this.GetAllpermission();
        }
      }
    }

    this.CloseModal();
  }
  Edit(item) {
    this.isInsert = false;
    console.log(item);
    this.permissionItem.id = item.PermissionId;
    this.permissionItem.name = item.PermissionName;
    this.permissionItem.status = item.IsActive;
    this.util.ShowLoading();
    this.api.SendRequestApi(ConfigAPI.GetAllApplication).then(async (res: any) => {


      console.log(res);
      if (res.successful) {
        this.application = res.data;
        for (let item of this.application) {
          item.isEditChecked = '0';
          item.isViewChecked = '0';
          item.isAddChecked = '0';
          item.isDeleteChecked = '0';
        }
        await this.api.SendRequestApi(`${ConfigAPI.GetPermissionManage}?PermissionId=${this.permissionItem.id}&token=${this.util.GetAccessToken()}`).then((res: any) => {
          console.log(res);
          for (let appitem of this.application) {
            for (let appPermission of res.data) {
              if (appitem.ApplicationId == appPermission.ApplicationId) {
                appitem.isAddChecked = appPermission.Add;
                appitem.isEditChecked = appPermission.Edit;
                appitem.isDeleteChecked = appPermission.Delete;
                appitem.isViewChecked = appPermission.View;
                appitem.PermissionManageId = appPermission.PermissionManageId;
              }
            }
            this.util.HideLoading();

          }
        }, (err) => {

        })
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

    this.openModal();
  }
  NewPermission() {
    this.isInsert = true;
    this.permissionItem.name = '';
    this.permissionItem.status = '';
    this.GetAllApplication();
    this.openModal();
  }
}
