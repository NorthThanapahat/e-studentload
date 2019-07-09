export class ConfigAPI {
    public static Base_API = "http://qdoc.ecmxpert.com:8008/api/uapi/q/sso/";
    // public static Base_API = "http://localhost/uapi/sso/";
    public static Base_URL = "http://qdoc.ecmxpert.com:8008/"

    public static Login = ConfigAPI.Base_URL + "connect/token";

    public static InsertLog = ConfigAPI.Base_API + "Insertuserlog";
    

    public static GetDepartment = ConfigAPI.Base_API + "getdepartment";
    public static GetUserInfo = ConfigAPI.Base_API + "getuserinfo";


    //home page
    public static GetApplication = ConfigAPI.Base_API + "getapplication";
    public static InsertApplication = ConfigAPI.Base_API + "insertapplication";
    public static GetAuditLog = ConfigAPI.Base_API + "getauditlog";
    public static DeleteApplication = ConfigAPI.Base_API + "deleteapplication";
    public static UpdateApplication = ConfigAPI.Base_API + "updateapplication";


    //person page
    public static GetAllPerson = ConfigAPI.Base_API + "getallperson";
    public static InsertPerson = ConfigAPI.Base_API + "insertperson";
    public static InsertContactPerson = ConfigAPI.Base_API + "insertpersoncontact";
    public static UpdateContactPerson = ConfigAPI.Base_API + "updatepersoncontact";
    public static UpdatePerson = ConfigAPI.Base_API + "updateperson";
    public static DeletePerson = ConfigAPI.Base_API + "deleteperson";

    // organization
    public static GetAllOrganization = ConfigAPI.Base_API + "getallorganization";
    public static InsertOrganization = ConfigAPI.Base_API + "insertorganization";
    public static UpdateOrganization = ConfigAPI.Base_API + "updateorganization";
    public static DeleteOrganization = ConfigAPI.Base_API + "deleteorganization";
    // department
    public static GetAllDepartment = ConfigAPI.Base_API + "getalldepartment";
    public static InsertDepartment = ConfigAPI.Base_API + "insertdepartment";
    public static InsertDepartmentPerson = ConfigAPI.Base_API + "insertdepartmentperson";
    public static UpdateDepartment = ConfigAPI.Base_API + "updatedepartment";
    public static UpdateDepartmentPerson = ConfigAPI.Base_API + "updatedepartmentperson";
    public static DeleteDepartment = ConfigAPI.Base_API + "deletedepartment";

    // group
    public static GetAllGroup = ConfigAPI.Base_API + "getallgroup";
    public static InsertGroup = ConfigAPI.Base_API + "insertgroup";
    public static InsertGroupPerson = ConfigAPI.Base_API + "insertgroupperson";
    public static UpdateGroup = ConfigAPI.Base_API + "updategroup";
    public static UpdateGroupPerson = ConfigAPI.Base_API + "updategroupperson";
    public static DeleteGroup = ConfigAPI.Base_API + "updategroup";


    // dashboard

    public static GetReportPerson = ConfigAPI.Base_API + "getreportperson";
    public static GetReportUserLog = ConfigAPI.Base_API + "getreportuserlog";




    public static GetPasswordManagement = ConfigAPI.Base_API + "getpasswordmanagement";
    public static UpdatePasswordManagement = ConfigAPI.Base_API + "updatepasswordmanagement";
    public static GetAllpermission = ConfigAPI.Base_API + "getallpermission";
    public static Insertpermission = ConfigAPI.Base_API + "insertpermission";
    public static Updatepermission = ConfigAPI.Base_API + "updatepermission";
    public static UpdatepermissionManage = ConfigAPI.Base_API + "updatepermissionmanage";
    public static InsertpermissionManage = ConfigAPI.Base_API + "insertpermissionmanage";
    
    

}