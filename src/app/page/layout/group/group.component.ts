import { Component, OnInit } from '@angular/core';
import { ApiProvider } from 'src/app/share/api/api';
import { UtilProvider } from 'src/app/share/util';
import { ConfigAPI } from 'src/app/share/api/ConfigApi';
import { AllPerson } from 'src/app/model/allperson';
import { Group } from 'src/app/model/request/group';
import { DataProvider } from 'src/app/share/provider/provider';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  allGroup: any;
  allperson: any;
  persons: Array<any>;
  group: Group = new Group();
  getDepartment: any;
  isInsert = false;
  constructor(public api: ApiProvider,
    public data: DataProvider,
    public util: UtilProvider) {
    this.data.page = 'group'
  }

  ngOnInit() {
    this.api.SendRequestApi(`${ConfigAPI.GetAllDepartment}?token=${this.util.GetAccessToken()}`).then((res: any) => {
      this.getDepartment = res;
    });
    this.api.SendRequestApi(`${ConfigAPI.GetAllGroup}?token=${this.util.GetAccessToken()}`).then((res: any) => {
      if (res.successful) {
        this.data.allGroup = res;
        this.data.group = res.data;
        this.api.SendRequestApi(`${ConfigAPI.GetAllPerson}?token=${this.util.GetAccessToken()}`).then((res: any) => {
          this.allperson = <AllPerson>res;
          this.persons = res.data;
          for (let item of this.persons) {
            item.selected = false;
          }
          console.log(this.allperson);
        });
      } else {
        // if (res.code == '-2146233088') {
        //   this.util.DoError();
        // }
      }

    });
  }
  GetGroup() {
    this.api.SendRequestApi(`${ConfigAPI.GetAllGroup}?token=${this.util.GetAccessToken()}`).then((res: any) => {
      if (res.successful) {
        this.data.allGroup = res;
        this.data.group = res.data;
      } else {
        // if (res.code == '-2146233088') {
        //   this.util.DoError();
        // }
      }
    });
  }
  SaveGroup() {
    this.CloseModal();
    if (this.isInsert) {
      let data = "GroupName=" + this.group.groupName + "&CreateBy=" + this.group.CreateBy + "&IsActive=" + this.group.isActive;

      this.api.SendRequestApiWithData(ConfigAPI.InsertGroup, data).then((res: any) => {
        if (res.successful) {
          if (this.group.GroupPerson.length > 0) {
            var isErr = false;

            for (let i in this.group.GroupPerson) {
              let data = "GroupId=" + res.data[0].GroupId + "&personId=" + this.group.GroupPerson[i].PersonId + "&CreateBy=" + this.group.CreateBy + "&IsActive=" + this.group.isActive;
              this.api.SendRequestApiWithData(ConfigAPI.InsertGroupPerson, data).then((res: any) => {
                if (!res.successful) {
                  isErr = true;
                }
              });

            }
            if (isErr) {
              this.GetGroup();
              this.util.MessageError(this.data.language);
            } else {
              this.GetGroup();
              this.api.InsertLog(this.data.userData.data[0].PersonId, 'Insert', "group");
              this.util.MessageSuccess(this.data.language);
            }
          } else {
            this.GetGroup();
            this.util.MessageSuccess(this.data.language);
            this.api.InsertLog(this.data.userData.data[0].PersonId, 'Insert', "group");

          }



        } else {
          this.util.MessageError(this.data.language);

        }
      }, (err) => {
        this.util.MessageError(this.data.language);

      });
    } else {
      let data = "GroupId=" + this.group.GroupId + "&GroupMemberId=" + this.group.GroupMemberId + "&GroupName=" + this.group.groupName + "&CreateBy=" + this.group.CreateBy + "&IsActive=" + this.group.isActive;

      this.api.SendRequestApiWithData(ConfigAPI.UpdateGroup, data).then((res: any) => {
        if (res.successful) {
          if (this.group.GroupPerson.length > 0) {
            var isErr = false;

            for (let i in this.group.GroupPerson) {
              let data = "GroupId=" + this.group.GroupId + "&personId=" + this.group.GroupPerson[i].PersonId + "&CreateBy=" + this.group.CreateBy + "&IsActive=" + this.group.isActive;
              this.api.SendRequestApiWithData(ConfigAPI.UpdateGroupPerson, data).then((res: any) => {
                if (!res.successful) {
                  isErr = true;
                }
              });

            }
            if (isErr) {
              this.GetGroup();
              this.util.MessageError(this.data.language);
            } else {
              this.GetGroup();
              this.util.MessageSuccess(this.data.language);
              this.api.InsertLog(this.data.userData.data[0].PersonId, 'Update', "group");

            }
          } else {
            this.GetGroup();
            this.api.InsertLog(this.data.userData.data[0].PersonId, 'Update', "group");

            this.util.MessageSuccess(this.data.language);
          }



        } else {
          this.util.MessageError(this.data.language);

        }
      }, (err) => {
        this.util.MessageError(this.data.language);

      });
    }
  }
  DepartmentSelete(value) {
    console.log(value);
  }

  AddPerson(item, i) {
    if (!item.selected) {
      this.group.GroupPerson.push(item);
      item.selected = true;
    }

    console.log(this.group.GroupPerson);
  }
  Edit(item) {
    this.isInsert = false;
    this.group.GroupPerson = [];
    this.group.groupName = item.GroupName;
    this.group.GroupId = item.GroupId;
    this.group.isActive = item.IsActive;
    this.group.CreateBy = item.CreateBy;
    this.group.GroupMemberId = item.GroupMemberId;
  }
  SaveDeleteGroup() {
    let data = "GroupMemberId=" + this.group.GroupMemberId + "&GroupId=" + this.group.GroupId + "&CreateBy=" + this.group.CreateBy + "&IsActive=" + this.group.isActive;
    this.api.SendRequestApiWithData(ConfigAPI.DeleteGroup, data).then((res: any) => {
      if (res.successful) {
        this.GetGroup();
        this.api.InsertLog(this.data.userData.data[0].PersonId, 'Delete', "group");
        
        this.util.MessageSuccess(this.data.language);
      } else {
        this.util.MessageError(this.data.language);
      }
    }, (err) => {
      this.util.MessageError(this.data.language);
    });
  }
  Delete(item) {
    this.group.groupName = item.GroupName;
    this.group.GroupId = item.GroupId;
    this.group.isActive = item.IsActive;
    this.group.CreateBy = item.CreateBy;
    this.group.GroupMemberId = item.GroupMemberId;
  }
  InsertGroup() {
    this.isInsert = true;
    this.group = new Group();
    this.group.department = this.getDepartment.data[0].DepartmentId;
    this.group.CreateBy = this.data.userData.data[0].UserId;
    this.group.isActive = '1';
  }
  DeletePerson(item, i) {
    console.log(i);
    this.group.GroupPerson.splice(i, 1);
    console.log(this.group.GroupPerson);
    for (let i in this.persons) {
      if (item.PersonId == this.persons[i].PersonId) {
        this.persons[i].selected = false;
      }
    }
    console.log(this.persons);
  }
  CloseModal() {
    for (let person of this.persons) {
      person.selected = false;
    }
  }

}
