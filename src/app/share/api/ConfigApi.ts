export class ConfigAPI{
    public static Base_API = "http://qdoc.ecmxpert.com:8008/api/uapi/q/sso/";
    // public static Base_API = "http://localhost/uapi/sso/";


    public static GetAllOrganization= ConfigAPI.Base_API + "getallorganization";
    public static GetAllDepartment= ConfigAPI.Base_API + "getalldepartment";
    public static GetDepartment = ConfigAPI.Base_API + "getdepartment";
    public static GetAllGroup = ConfigAPI.Base_API + "getallgroup";

    
    //home page
    public static GetApplication = ConfigAPI.Base_API + "getapplication";
    public static InsertApplication = ConfigAPI.Base_API + "insertapplication";
    public static GetAuditLog = ConfigAPI.Base_API + "getauditlog";
    public static DeleteApplication = ConfigAPI.Base_API + "deleteapplication";
    public static UpdateApplication = ConfigAPI.Base_API + "updateapplication";


    //person page
    public static GetAllPerson = ConfigAPI.Base_API + "getallperson";
    public static InsertPerson = ConfigAPI.Base_API + "insertperson";
    public static UpdatePerson = ConfigAPI.Base_API + "updateperson";
    public static DeletePerson = ConfigAPI.Base_API + "deleteperson";

    
}