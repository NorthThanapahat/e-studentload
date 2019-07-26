import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserData, Permission } from 'src/app/model/response/user-data';
import { Person } from 'src/app/model/InsertPerson';
import { BackUpData, BackupListData } from 'src/app/model/BackupData';

@Injectable()
export class DataProvider {
    province: any;
    district: any;
    UserItem:UserItem = new UserItem();
    subDistrict: any;
    userData: UserData;
    applicationPermission: Permission;
    personPermission: Permission;
    organizationPermission: Permission;
    departmentPermission: Permission;
    groupPermission: Permission;
    dashboardPermission: Permission;
    changePasswordPermission: Permission;
    passwordManagePermission: Permission;
    backupPermission: Permission;
    permissionPermission: Permission;
    auditlogPermission: Permission;
    language: string = 'th';
    pageNum = 1;
    pageSize = 10;
    page = '';
    allApplication: any;
    application: Array<any>;
    allPerson: any;
    persons: Array<Person>;
    backupData: BackUpData;
    backupListData: BackupListData;
    password: Array<any>;
    allPassword: any;

    allPermission: any;
    permission: Array<any>;

    allOrganization: any;
    organizations: Array<any>;

    backupsetting: BackupSetting;

    department: Array<any>;
    allDepartment: any;
    allLog: any;
    applicationLog: Array<any>;
    personLog: Array<Log>;
    organizationLog: Array<Log>;
    departmentLog: Array<Log>;
    groupLog: Array<Log>;
    allGroup: any;
    group: Array<any>;
    constructor() { }

    filterItem(value) {
        var rex = new RegExp("[0-9]+$");
        let isId = rex.test(value);
        if (this.page == 'application') {
            return this.application.filter((item) => {
                return item.ApplicationName.toLowerCase().indexOf(value.toLowerCase()) > -1;
            });
        } else if (this.page == 'person') {
            return this.persons.filter((item) => {
                return item.UserId.toLowerCase().indexOf(value.toLowerCase()) > -1 || item.Fname.toLowerCase().indexOf(value.toLowerCase()) > -1;
            }) 
        } else if (this.page == 'organization') {
            return this.organizations.filter((item) => {
                return item.OrganizationName.toLowerCase().indexOf(value.toLowerCase()) > -1;
            })
        } else if (this.page == 'department') {
            return this.department.filter((item) => {
                return item.DepartmentName.toLowerCase().indexOf(value.toLowerCase()) > -1;
            })
        } else if (this.page == 'group') {
            return this.group.filter((item) => {
                return item.GroupName.toLowerCase().indexOf(value.toLowerCase()) > -1;
            })
        } else if (this.page == 'manage-password') {
            return this.password.filter((item) => {
                return item.ApplicationName.toLowerCase().indexOf(value.toLowerCase()) > -1 || item.OldUsername.toLowerCase().indexOf(value.toLowerCase()) > -1;
            })
        } else if (this.page == 'manage-role') {
            return this.permission.filter((item) => {
                return item.PermissionName.toLowerCase().indexOf(value.toLowerCase()) > -1;
            })
        }
    }
}
export class Log {
    CreateDate: string;
    EventLog: string;
    Menu: string;
    PersonId: string;
    UserLogId: string;
    Date: string;
    Time: string;
    Month: string;
}
export class UserItem{
    id:string = '';
    isUserProfile:boolean;
}
export class BackupSetting {
    dateAmt: string;
    startDate: string;
    time: string;
    frequency: string;
    isRunBackup: boolean;
    date: Date;
    isDayToBackUp: boolean;
}