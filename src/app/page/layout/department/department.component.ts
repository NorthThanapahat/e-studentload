import { Component, OnInit } from '@angular/core';
import { ApiProvider } from 'src/app/share/api/api';
import { ConfigAPI } from 'src/app/share/api/ConfigApi';
import { AllPerson } from 'src/app/model/allperson';
import { UtilProvider } from 'src/app/share/util';
import { Organizaion, Address } from 'src/app/model/request/organization/organization';
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
    this.organization.AddressForDocument = new Address();
    this.organization.OrganizationAddress = new Address();
    this.GetOrganization();
    this.Organization();
  }
  GetOrganization() {
    this.api.SendRequestApi(`${ConfigAPI.GetAllOrganization}?token=${this.util.GetAccessToken()}`).then((res: any) => {
      this.data.allOrganization = res;
      this.data.organizations = res.data;
    });
  }
  Organization() {
    this.isInsert = true;
    this.organization = new Organizaion();
    this.organization.AddressForDocument = new Address();
    this.organization.OrganizationAddress = new Address();

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

    this.organization.AddressForDocument.Province = this.provinceSelect.Doc.split('|')[1];
    this.organization.AddressForDocument.District = this.districtSelect.Doc.split('|')[1];
    this.organization.AddressForDocument.SubDistrict = this.subDistrictSelect.Doc.split('|')[1];
    this.organization.OrganizationAddress.Province = this.provinceSelect.Add.split('|')[1];
    this.organization.OrganizationAddress.District = this.districtSelect.Add.split('|')[1];
    this.organization.OrganizationAddress.SubDistrict = this.subDistrictSelect.Add.split('|')[1];
  }

  SaveOrganization() {

    this.organization.AddressForDocument.District = this.districtSelect.Doc.split('|')[1];
    this.organization.AddressForDocument.SubDistrict = this.subDistrictSelect.Doc.split('|')[1];
    this.organization.AddressForDocument.Province = this.provinceSelect.Doc.split('|')[1];
    this.organization.OrganizationAddress.Province = this.provinceSelect.Add.split('|')[1];
    this.organization.OrganizationAddress.District = this.districtSelect.Add.split('|')[1];
    this.organization.OrganizationAddress.SubDistrict = this.subDistrictSelect.Add.split('|')[1];
    console.log(this.organization);

    let data = "OrganizationName=" + this.organization.OrganizationName +
      "&OrganizationPhone='" + this.organization.OrganizationPhone +
      "'&AddressType= 1" +
      "&SubDistrict=" + this.organization.OrganizationAddress.SubDistrict +
      "&District=" + this.organization.OrganizationAddress.District +
      "&Province=" + this.organization.OrganizationAddress.Province +
      "&Zipcode=" + this.organization.OrganizationAddress.Zipcode +
      "&HouseNo=" + this.organization.OrganizationAddress.HouseNo +
      "&Building=" + this.organization.OrganizationAddress.Building +
      "&Road=" + this.organization.OrganizationAddress.Road +
      "&Soi=" + this.organization.OrganizationAddress.Alley +
      "CreateBy=" + this.data.userData.data[0].PersonId +
      "&IsActive=1"
    if (this.isInsert) {
      this.api.SendRequestApiWithData(ConfigAPI.InsertOrganization, data).then((res: any) => {
        if (res.successful) {
          let data = "OrganizationName=" + this.organization.OrganizationName +
            "&OrganizationPhone='" + this.organization.OrganizationPhone +
            "'&AddressType= 2" +
            "&SubDistrict=" + this.organization.AddressForDocument.SubDistrict +
            "&District=" + this.organization.AddressForDocument.District +
            "&Province=" + this.organization.OrganizationAddress.Province +
            "&Zipcode=" + this.organization.OrganizationAddress.Zipcode +
            "&HouseNo=" + this.organization.OrganizationAddress.HouseNo +
            "&Building=" + this.organization.OrganizationAddress.Building +
            "&Road=" + this.organization.OrganizationAddress.Road +
            "&Soi=" + this.organization.OrganizationAddress.Alley +
            "CreateBy=" + this.data.userData.data[0].PersonId +
            "&IsActive=1"
          this.api.SendRequestApiWithData(ConfigAPI.InsertOrganization, data).then((res: any) => {
            if (res.successful) {
              this.util.MessageSuccess(this.data.language);
              this.GetOrganization();

            } else {
              this.util.MessageError(this.data.language);
              this.GetOrganization();

            }
          });
        } else {
          this.util.MessageError(this.data.language);
        }
      }, (err) => {
        this.util.MessageError(this.data.language);
      });
    } else {
      this.api.SendRequestApiWithData(ConfigAPI.UpdateOrganization, data).then((res: any) => {
        if (res.successful) {
          let data = "OrganizationName=" + this.organization.OrganizationName +
            "&OrganizationPhone=" + this.organization.OrganizationPhone +
            "&AddressType= 2" +
            "&SubDistrict=" + this.organization.AddressForDocument.SubDistrict +
            "&District=" + this.organization.AddressForDocument.District +
            "&Province=" + this.organization.OrganizationAddress.Province +
            "&Zipcode=" + this.organization.OrganizationAddress.Zipcode +
            "&HouseNo=" + this.organization.OrganizationAddress.HouseNo +
            "&Building=" + this.organization.OrganizationAddress.Building +
            "&Road=" + this.organization.OrganizationAddress.Road +
            "&Soi=" + this.organization.OrganizationAddress.Alley +
            "CreateBy=" + this.data.userData.data[0].PersonId +
            "&IsActive=1"
          this.api.SendRequestApiWithData(ConfigAPI.UpdateOrganization, data).then((res: any) => {
            if (res.successful) {
              this.util.MessageSuccess(this.data.language);
              this.GetOrganization();

            } else {
              this.util.MessageError(this.data.language);
              this.GetOrganization();

            }
          });
        } else {
          this.util.MessageError(this.data.language);
        }
      }, (err) => {
        this.util.MessageError(this.data.language);
      });
    }

  }

  SaveDeletePerson() {
    let data = "OrganizationId=" + this.organization.OrganizationId + "&CreateBy=" + this.data.userData.data[0].UserName + "&IsActive=1";
    this.api.SendRequestApiWithData(ConfigAPI.DeleteOrganization, data).then((res: any) => {
      if (res.successful) {
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
    this.organization.OrganizationId = item.OrganizationId;
    this.organization.OrganizationName = item.OrganizationName;
    this.organization.OrganizationDetails = item.OrganizationDetail;
    this.organization.NumberofOrganization = item.TaxpayerIdentificationNumber;
    this.organization.AddressForDocument.Alley = item.SendingAddressAlley;
    this.organization.AddressForDocument.HouseNo = item.SendingAddressHouseNo;
    this.organization.AddressForDocument.District = item.SendingAddressDistrict;
    this.organization.AddressForDocument.SubDistrict = item.SendingAddressSubDistrict;
    this.organization.AddressForDocument.Road = item.SendingAddressRoad;
    this.organization.AddressForDocument.Province = item.SendingAddressProvince;
    this.organization.AddressForDocument.Zipcode = item.SendingAddressZipcode;
    this.organization.OrganizationAddress.Alley = item.OrganizationAddressAlley;
    this.organization.OrganizationAddress.HouseNo = item.OrganizationAddressHouseNo;
    this.organization.OrganizationAddress.District = item.OrganizationAddressDistrict;
    this.organization.OrganizationAddress.SubDistrict = item.OrganizationAddressSubdistrict;
    this.organization.OrganizationAddress.Road = item.OrganizationAddressRoad;
    this.organization.OrganizationAddress.Province = item.OrganizationAddressProvince;
    this.organization.OrganizationAddress.Zipcode = item.OrganizationAddressZipcode;


  }
  DeleteOrganization(item) {
    this.organization.OrganizationId = item.OrganizationId;
    this.organization.OrganizationName = item.OrganizationName;
    this.organization.OrganizationDetails = item.OrganizationDetail;
    this.organization.NumberofOrganization = item.TaxpayerIdentificationNumber;
    this.organization.AddressForDocument.Alley = item.SendingAddressAlley;
    this.organization.AddressForDocument.HouseNo = item.SendingAddressHouseNo;
    this.organization.AddressForDocument.District = item.SendingAddressDistrict;
    this.organization.AddressForDocument.SubDistrict = item.SendingAddressSubDistrict;
    this.organization.AddressForDocument.Road = item.SendingAddressRoad;
    this.organization.AddressForDocument.Province = item.SendingAddressProvince;
    this.organization.AddressForDocument.Zipcode = item.SendingAddressZipcode;
    this.organization.OrganizationAddress.Alley = item.OrganizationAddressAlley;
    this.organization.OrganizationAddress.HouseNo = item.OrganizationAddressHouseNo;
    this.organization.OrganizationAddress.District = item.OrganizationAddressDistrict;
    this.organization.OrganizationAddress.SubDistrict = item.OrganizationAddressSubdistrict;
    this.organization.OrganizationAddress.Road = item.OrganizationAddressRoad;
    this.organization.OrganizationAddress.Province = item.OrganizationAddressProvince;
    this.organization.OrganizationAddress.Zipcode = item.OrganizationAddressZipcode;
  }

  ProvinceSeletect(value, type) {
    if (type == 'AddressForDocument') {
      this.districtList.Doc = [];
      this.organization.AddressForDocument.Province = value.split('|')[1];
      this.districtList.Doc = this.data.district.filter(item => item.changwat_pid == value.split('|')[0]);
      this.districtSelect.Doc = this.districtList.Doc[0].pid + "|" + this.districtList.Doc[0].name;
      this.subDistrictSelect.Doc = this.subDistrictList.Doc[0].pid + "|" + this.subDistrictList.Doc[0].name;
    }
    else if (type == 'OrganizationAddress') {
      this.districtList.Add = [];
      this.organization.OrganizationAddress.Province = value.split('|')[1];
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
      this.organization.AddressForDocument.District = value.split('|')[1];
      this.subDistrictList.Doc = this.data.subDistrict.filter(item => item.amphoe_pid == value.split('|')[0]);
      this.districtSelect.Doc = this.districtList.Doc[0].pid + "|" + this.districtList.Doc[0].name;
      this.subDistrictSelect.Doc = this.subDistrictList.Doc[0].pid + "|" + this.subDistrictList.Doc[0].name;
    }
    else if (type == 'OrganizationAddress') {
      this.subDistrictList.Add = [];
      this.organization.OrganizationAddress.District = value.split('|')[1];
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
      this.organization.AddressForDocument.SubDistrict = value.split('|')[1];
    }
    else if (type == 'OrganizationAddress') {
      this.organization.OrganizationAddress.SubDistrict = value.split('|')[1];
    }
  }



}
