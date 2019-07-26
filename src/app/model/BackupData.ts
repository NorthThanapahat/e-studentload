import { UserData } from './response/user-data';

export class BackUpData {
    UserData:UserData;
    BackUpData:Array<BackupListData>;
}
export class BackupListData{
    Date: string;
    Data: BackupDataDetails = new BackupDataDetails();
}
export class BackupDataDetails {
    Application: Array<ApplicationData>;
    Person: Array<PersonData>;
    Organization: Array<OrganizationData>;
    Department: Array<DepartmentData>;
    Group: Array<GroupData>;
    Dashboard: DashboardAllData = new DashboardAllData();
    ManagePassword: Array<ManagePasswordData>;
    ManagePermission: Array<ManagePermissionData>;
    AuditLog: Array<AuditLogData>;
}
export class DashboardAllData {
  
    InformationNews: Array<InformationNews>;
}
export class ApplicationData {
    AppId: string
    ApplicationId: string;
    ApplicationName: string;
    Detail: string;
    File: string
    LinkURL: string;
    personid: string;
    userID: string;
}

export class PersonData {
    CreateBy: string;
    CreateDate: string;
    Depart: string;
    Email: string;
    Fname: string;
    IsActive: string;
    Lname: string;
    Offi_tel: string;
    PermissionId: string;
    PersonId: string;
    Position: string;
    Staff_status: string;
    Title: string;
    UserId: string;
}

export class OrganizationData {
    CreateBy: string;
    CreateDate: string;
    IsActive: string;
    OrganizationAddressAlley: string;
    OrganizationAddressDistrict: string;
    OrganizationAddressHouseNo: string;
    OrganizationAddressProvince: string;
    OrganizationAddressRoad: string;
    OrganizationAddressSubdistrict: string;
    OrganizationAddressZipcode: string;
    OrganizationDetail: string;
    OrganizationEmail: string;
    OrganizationId: string;
    OrganizationName: string;
    OrganizationPhone: string;
    SendingAddressAlley: string;
    SendingAddressDistrict: string;
    SendingAddressHouseNo: string;
    SendingAddressProvince: string;
    SendingAddressRoad: string;
    SendingAddressSubDistrict: string;
    SendingAddressZipcode: string;
    TaxpayerIdentificationNumber: string;
}

export class DepartmentData {
    DepartmentDetail: string;
    DepartmentId: string;
    DepartmentName: string;
    DepartmentPhone: string;
    Fname: string;
    Lname: string;
    OrganizationId: string;
    OrganizationName: string;
    Position: string;
    Title: string;
}

export class GroupData {
    CreateBy: string;
    CreateDate: string;
    GroupDetail: string;
    GroupId: string;
    GroupMemberId: string;
    GroupName: string;
    IsActive: string;
    personId: string;
}
export class StatisticsOfUser {
    CountPerson: string;
    CreateBy: string;
    CreateDate: string;
    Depart: string;
    Email: string;
    Fname: string;
    IsActive: string;
    Lname: string;
    Offi_tel: string;
    PermissionId: string;
    PersonId: string;
    Position: string;
    Staff_status: string;
    Title: string;
    UserId: string;
}

export class StatisticsOfUsingSystem {
    CountPerson: string;
    CreateDate: string;
    EventLog: string;
    Menu: string;
    PersonId: string;
    UserLogId: string;
}

export class InformationNews {
    CreateBy: string;
    CreateDate: string;
    DetailNew: string;
    EndDate: string;
    IsActive: string;
    NewId: string;
    StrDate: string;
    TopicNew: string;
}

export class ManagePasswordData {
    ApplicationId: string;
    ApplicationName: string;
    CreateBy: string;
    CreateDate: string;
    IsActive: string;
    PasswordId: string;
    id: number;
    userID: string;
}

export class ManagePermissionData {
    CreateBy: string;
    CreateDate: string;
    IsActive: string;
    PermissionId: string;
    PermissionName: string;
}
export class AuditLogData {
    CreateDate: string;
    EventLog:string;
    Menu:string;
    PersonId: string;
    UserLogId:string;
}