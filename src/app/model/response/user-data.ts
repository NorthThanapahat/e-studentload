export class UserData {
    data: Array<UserDataDetails>;
    successful: boolean;
}

export class UserDataDetails {
    CreateBy: string;
    CreateDate: string;
    Fname: string;
    Lname: string;
    PermissionId: string;
    Permission: Array<Permission>;
    PermissionMenu:PermissionMenu;
    PersonId: string;
    UserId: string;
    password: string;
    Password:string;
    depart: string;
    email: string;
    offi_tel: string;
    position: string;
    staff_status: string;
    title: string;
}
export class PermissionMenu{
    hasApplication:boolean = false;
    hasPerson:boolean = false;
    hasOrganization:boolean = false;
    hasDepartment:boolean = false;
    hasGroup:boolean = false;
    hasDashboard:boolean = false;
    hasChangePassword:boolean = false;
    hasPasswordManage:boolean = false;
    hasBackUp:boolean = false;
    hasPermission:boolean = false;
    hasAuditLog:boolean = false;
    PermissionMenuList:Array<PermissionMenuList>;
    
}
export class PermissionMenuList{
    ApplicationId:string;
    Menu:string;
    itemPermission:Permission;
}
export class Permission {
    PermissionManageId: string;
    View: string;
    Add: string;
    Edit: string;
    Delete:string;
    Import: string;
    Export: string;
    CreateBy: string;
    CreateDate: string;
    IsActive: string;
    ApplicationId: string;
    PermissionId: string;
}