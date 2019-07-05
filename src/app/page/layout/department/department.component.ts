import { Component, OnInit } from '@angular/core';
import { ApiProvider } from 'src/app/share/api/api';
import { ConfigAPI } from 'src/app/share/api/ConfigApi';
import { AllPerson } from 'src/app/model/allperson';
import { UtilProvider } from 'src/app/share/util';
import { Organizaion } from 'src/app/model/request/organization/organization';
import { ThailandData } from 'src/app/constant/ThailandData';
import { DataProvider } from 'src/app/share/provider/provider';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  allDepartment: any;
  isInsert = false;
  districtList: any;
  subDistrictList: any;
  organization: Organizaion;

  provinceSelect: any;
  districtSelect: any;
  subDistrictSelect: any;



  constructor(public api: ApiProvider,
    public util: UtilProvider,
    public data: DataProvider) {
    this.data.page = 'organization';

  }

  ngOnInit() {
    this.subDistrictList = [];
    if (this.data.language == 'th') {
      this.data.province = ThailandData.province.th.changwats;
      this.data.district = ThailandData.district.th.amphoes;
      this.data.subDistrict = ThailandData.subDistrict.th.tambons;
    } else if (this.data.language == 'en') {
      this.data.province = ThailandData.province.en.changwats;
      this.data.district = ThailandData.district.en.amphoes;
      this.data.subDistrict = ThailandData.subDistrict.en.tambons;
    }


    this.organization = new Organizaion();
    this.GetOrganization();
    this.Organization();
  }
  GetOrganization() {
    this.api.SendRequestApi(`${ConfigAPI.GetAllOrganization}?token=${this.util.GetAccessToken()}`).then((res: any) => {
      if(res.successful){
        this.data.allOrganization = res;
        this.data.organizations = res.data;
      }else{
        // if (res.code == '-2146233088') {
        //   this.util.DoError();
        // }
      }
      
    });
  }
  Organization() {
    this.isInsert = true;
    this.organization = new Organizaion();

    this.provinceSelect = { Add: this.data.province[0].pid + "|" + this.data.province[0].name, Doc: this.data.province[0].pid + "|" + this.data.province[0].name }
    console.log(this.provinceSelect);
    this.districtList = {
      Add: this.data.district.filter(item => item.changwat_pid == this.provinceSelect.Add.split('|')[0]),
      Doc: this.data.district.filter(item => item.changwat_pid == this.provinceSelect.Doc.split('|')[0])
    };
    this.districtSelect = {
      Add: this.districtList.Add[0].pid + "|" + this.districtList.Add[0].name,
      Doc: this.districtList.Doc[0].pid + "|" + this.districtList.Doc[0].name
    }

    this.subDistrictList = {
      Add: this.data.subDistrict.filter(item => item.amphoe_pid == this.districtSelect.Add.split('|')[0]),
      Doc: this.data.subDistrict.filter(item => item.amphoe_pid == this.districtSelect.Doc.split('|')[0])
    }
    this.subDistrictSelect = {
      Add: this.subDistrictList.Add[0].pid + "|" + this.subDistrictList.Add[0].name,
      Doc: this.subDistrictList.Doc[0].pid + "|" + this.subDistrictList.Doc[0].name
    }

    this.organization.SendingAddressProvince = this.provinceSelect.Doc.split('|')[1];
    this.organization.SendingAddressDistrict = this.districtSelect.Doc.split('|')[1];
    this.organization.SendingAddressSubDistrict = this.subDistrictSelect.Doc.split('|')[1];
    this.organization.OrganizationAddressProvince = this.provinceSelect.Add.split('|')[1];
    this.organization.OrganizationAddressDistrict = this.districtSelect.Add.split('|')[1];
    this.organization.OrganizationAddressSubdistrict = this.subDistrictSelect.Add.split('|')[1];
  }

  SaveOrganization() {

   
    this.organization.SendingAddressProvince = this.provinceSelect.Doc.split('|')[1];
    this.organization.SendingAddressDistrict = this.districtSelect.Doc.split('|')[1];
    this.organization.SendingAddressSubDistrict = this.subDistrictSelect.Doc.split('|')[1];
    this.organization.OrganizationAddressProvince = this.provinceSelect.Add.split('|')[1];
    this.organization.OrganizationAddressDistrict = this.districtSelect.Add.split('|')[1];
    this.organization.OrganizationAddressSubdistrict = this.subDistrictSelect.Add.split('|')[1];
    console.log(this.organization);

    let data = "OrganizationName=" + this.organization.OrganizationName +
        "&TaxpayerIdentificationNumber="+this.organization.TaxpayerIdentificationNumber+
        "&OrganizationDetail="+this.organization.OrganizationDetail+
        "&OrganizationAddressHouseNo="+this.organization.OrganizationAddressHouseNo+
        "&OrganizationAddressSubdistrict="+this.organization.OrganizationAddressSubdistrict+
        "&OrganizationAddressDistrict= "+this.organization.OrganizationAddressDistrict+
        "&OrganizationAddressProvince="+this.organization.OrganizationAddressProvince+
        "&OrganizationAddressZipcode="+this.organization.OrganizationAddressZipcode+
        "&OrganizationAddressRoad="+this.organization.OrganizationAddressRoad+
        "&OrganizationAddressAlley="+this.organization.OrganizationAddressAlley+
        "&CreateBy="+this.organization.CreateBy+
        "&IsActive="+this.organization.IsActive+
        "&SendingAddressHouseNo="+this.organization.SendingAddressHouseNo+
        "&SendingAddressRoad="+this.organization.SendingAddressRoad+
        "&SendingAddressAlley="+this.organization.SendingAddressAlley+
        "&SendingAddressProvince="+this.organization.SendingAddressProvince+
        "&SendingAddressSubDistrict="+this.organization.SendingAddressSubDistrict+
        "&SendingAddressDistrict="+this.organization.SendingAddressDistrict+
        "&SendingAddressZipcode="+this.organization.SendingAddressZipcode;
    if (this.isInsert) {
      this.api.SendRequestApiWithData(ConfigAPI.InsertOrganization, data).then((res: any) => {
        if (res.successful) {
          this.api.InsertLog(this.data.userData.data[0].PersonId, 'Insert', "organization");
          this.util.MessageSuccess(this.data.language);
          this.GetOrganization();
        } else {
          this.util.MessageError(this.data.language);
        }
      }, (err) => {
        this.util.MessageError(this.data.language);
      });
    } else {
      let data = "OrganizationName=" + this.organization.OrganizationName +
        "&TaxpayerIdentificationNumber="+this.organization.TaxpayerIdentificationNumber+
        "&OrganizationDetail="+this.organization.OrganizationDetail+
        "&OrganizationAddressHouseNo="+this.organization.OrganizationAddressHouseNo+
        "&OrganizationAddressSubdistrict="+this.organization.OrganizationAddressSubdistrict+
        "&OrganizationAddressDistrict= "+this.organization.OrganizationAddressDistrict+
        "&OrganizationAddressProvince="+this.organization.OrganizationAddressProvince+
        "&OrganizationAddressZipcode="+this.organization.OrganizationAddressZipcode+
        "&OrganizationAddressRoad="+this.organization.OrganizationAddressRoad+
        "&OrganizationAddressAlley="+this.organization.OrganizationAddressAlley+
        "&CreateBy="+this.organization.CreateBy+
        "&IsActive="+this.organization.IsActive+
        "&SendingAddressHouseNo="+this.organization.SendingAddressHouseNo+
        "&SendingAddressRoad="+this.organization.SendingAddressRoad+
        "&SendingAddressAlley="+this.organization.SendingAddressAlley+
        "&SendingAddressProvince="+this.organization.SendingAddressProvince+
        "&SendingAddressSubDistrict="+this.organization.SendingAddressSubDistrict+
        "&SendingAddressDistrict="+this.organization.SendingAddressDistrict+
        "&SendingAddressZipcode="+this.organization.SendingAddressZipcode+
        "&OrganizationId="+this.organization.OrganizationId;

      this.api.SendRequestApiWithData(ConfigAPI.UpdateOrganization, data).then((res: any) => {
        if (res.successful) {
          this.api.InsertLog(this.data.userData.data[0].PersonId, 'Update', "organization");
          this.util.MessageSuccess(this.data.language);
          this.GetOrganization();

        } else {
          this.util.MessageError(this.data.language);
          this.GetOrganization();

        }
      });
    }
  }




  SaveDeletePerson() {
    let data = "OrganizationId=" + this.organization.OrganizationId + "&CreateBy=" + this.data.userData.data[0].UserName + "&IsActive=1";
    this.api.SendRequestApiWithData(ConfigAPI.DeleteOrganization, data).then((res: any) => {
      if (res.successful) {
        this.api.InsertLog(this.data.userData.data[0].PersonId, 'Delete', "organization");
        this.util.MessageSuccess(this.data.language);
        this.GetOrganization();
      } else {
        this.util.MessageError(this.data.language);

      }
    }, (err: any) => {
      this.util.MessageError(this.data.language);
    });
  }
  UpdateOrganization(item) {
    this.isInsert = false;
    this.organization = item;
    console.log(this.organization);


  }
  DeleteOrganization(item) {
    this.organization = item;
    console.log(this.organization);
  }

  ProvinceSeletect(value, type) {
    if (type == 'AddressForDocument') {
      this.districtList.Doc = [];
      this.organization.SendingAddressProvince = value.split('|')[1];
      this.districtList.Doc = this.data.district.filter(item => item.changwat_pid == value.split('|')[0]);
      this.districtSelect.Doc = this.districtList.Doc[0].pid + "|" + this.districtList.Doc[0].name;
      this.subDistrictSelect.Doc = this.subDistrictList.Doc[0].pid + "|" + this.subDistrictList.Doc[0].name;
    }
    else if (type == 'OrganizationAddress') {
      this.districtList.Add = [];
      this.organization.OrganizationAddressProvince = value.split('|')[1];
      this.districtList.Add = this.data.district.filter(item => item.changwat_pid == value.split('|')[0]);
      this.districtSelect.Add = this.districtList.Add[0].pid + "|" + this.districtList.Add[0].name;
      this.subDistrictSelect.Add = this.subDistrictList.Add[0].pid + "|" + this.subDistrictList.Add[0].name;
    }

    console.log(this.organization);
    console.log(this.districtList);
    console.log(value);
  }

  DistrictSelect(value, type) {
    if (type == 'AddressForDocument') {
      this.subDistrictList.Doc = [];
      this.organization.SendingAddressDistrict = value.split('|')[1];
      this.subDistrictList.Doc = this.data.subDistrict.filter(item => item.amphoe_pid == value.split('|')[0]);
      this.districtSelect.Doc = this.districtList.Doc[0].pid + "|" + this.districtList.Doc[0].name;
      this.subDistrictSelect.Doc = this.subDistrictList.Doc[0].pid + "|" + this.subDistrictList.Doc[0].name;
    }
    else if (type == 'OrganizationAddress') {
      this.subDistrictList.Add = [];
      this.organization.OrganizationAddressDistrict = value.split('|')[1];
      this.subDistrictList.Add = this.data.subDistrict.filter(item => item.amphoe_pid == value.split('|')[0]);
      this.districtSelect.Add = this.districtList.Add[0].pid + "|" + this.districtList.Add[0].name;
      this.subDistrictSelect.Add = this.subDistrictList.Add[0].pid + "|" + this.subDistrictList.Add[0].name;
    }

    console.log(this.organization);
    console.log(this.subDistrictList);
    console.log(value);
  }

  SubDistrictSelect(value, type) {
    if (type == 'AddressForDocument') {
      this.organization.SendingAddressSubDistrict = value.split('|')[1];
    }
    else if (type == 'OrganizationAddress') {
      this.organization.OrganizationAddressSubdistrict = value.split('|')[1];
    }
  }



}
