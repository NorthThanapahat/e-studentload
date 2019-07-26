export class PasswordManageMent{
    successful:boolean;
    data:Array<PasswordManageMentData>;
}

export class PasswordManageMentData{
    ApplicationId:string = '';
    ApplicationName:string = '';
    CreateBy:string = '';
    CreateDate :string = '';
    IsActive:string = '';
    userID:string = '';
    NewUsername:string = '';
    OldUsername:string = '';
    PasswordId:string = '';
    ConfirmPassword:string=  '';
    NewPassword:string = '';
    OldPassword:string = '';
}