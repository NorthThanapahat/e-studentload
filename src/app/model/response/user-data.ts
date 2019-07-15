export class UserData {
    data: Array<UserDataDetails>;
    successful: boolean;
}

export class UserDataDetails {
    CreateBy:string;
    CreateDate:string;
    Fname:string;
    Lname:string;
    PermissionId:string;
    PersonId:string;
    UserId:string;
    password:string;
    depart:string;
    email:string;
    offi_tel:string;
    position:string;
    staff_status:string;
    title:string;
}