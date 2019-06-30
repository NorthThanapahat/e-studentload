export class Department{
    DepartmentId:string = '';
    DepartmentName:string = '';
    OrganizationId:string = '';
    Detail:string = '';
    InternalPhoneNumber:string = '';
    DepartmentPhoto:string='';
    DepartmentPerson : Array<DepartmentPerson> = [];
}

export class DepartmentPerson{
    PersonId:string;
    PersonName:string;
}