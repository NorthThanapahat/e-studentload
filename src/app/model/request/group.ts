export class Group{
    groupName:string = '';
    department:string = '';
    isOther:boolean;
    isActive:string = '';
    CreateBy:string = '';
    GroupId:string = '';
    GroupMemberId:string = '';
    GroupPerson:Array<GroupPerson> = [];
}

export class GroupPerson{
    PersonId:string = '';
    PersonName:string = '';
    PersonPosition:string = '';
    PersonDepartment:number = 0;
    Contact:string = '';
    PathPhoto:string = '';
}