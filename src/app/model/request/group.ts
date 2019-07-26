export class Group{
    groupName:string = '';
    department:string = '';
    isOther:boolean;
    isActive:string = '';
    CreateBy:string = '';
    GroupId:string = '';
    GroupDetails:string = '';
    GroupMemberId:string = '';
    GroupPerson:Array<any> = [];
}

export class GroupPerson{
    PersonId:string = '';
    PersonName:string = '';
    Position:string = '';
    Depart:number = 0;
    Contact:string = '';
    PathPhoto:string = '';
}