export class UserData{
   data:Array<UserDataDetails>;
   successful:boolean;
}

export class UserDataDetails{
    PersonId:string = '';
    PersonName:string = '';
    PersonPosition:string = '';
    PersonDepartment:string = '';
    Contact:string = '';
    PathPhoto:string = '';
    UserName:string = '';
    Password:string = '';
    ConfirmPassword:string = '';
    
}