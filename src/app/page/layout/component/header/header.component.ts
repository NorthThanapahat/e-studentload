import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/share/provider/provider';
import { TranslateService } from '@ngx-translate/core';
import { ThailandData } from 'src/app/constant/ThailandData';
import { UtilProvider } from 'src/app/share/util';
import { UserData } from 'src/app/model/response/user-data';
import { ConfigAPI } from 'src/app/share/api/ConfigApi';
import { ApiProvider } from 'src/app/share/api/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  constructor(
    public router: Router,
    public data: DataProvider,
    public translate: TranslateService,
    public util: UtilProvider,
    public api: ApiProvider
  ) { }

  ngOnInit() {
    if (this.util.GetUserInfo() != undefined) {
      this.data.userData = <UserData>this.util.GetUserInfo();
    }
    console.log(this.util.GetUserInfo());
    this.username = this.data.userData.data[0].Fname + this.data.userData.data[0].Lname;
    this.translate.setDefaultLang('th');
    if (localStorage.getItem('language') == 'th' || localStorage.getItem('language') == 'en') {
      this.translate.use(localStorage.getItem('language'));
      this.data.language = localStorage.getItem('language');
    }

    this.translate.get('Title').subscribe((res: string) => {
      console.log(res);
    });
  }
  SearchItem(value) {
    console.log(value);
    console.log(this.data.page);
    if (this.data.page == 'application') {
      if (value != '') {
        this.data.application = this.data.filterItem(value);
        console.log(this.data.application);
      } else {
        this.data.application = this.data.allApplication.data;
      }

    } else if (this.data.page == 'person') {
      if (value != '') {
        this.data.persons = this.data.filterItem(value);
        console.log(this.data.persons);
      } else {
        this.data.persons = this.data.allPerson.data;
      }
    } else if (this.data.page == 'organization') {
      if (value != '') {
        this.data.organizations = this.data.filterItem(value);
        console.log(this.data.organizations);
      } else {
        this.data.organizations = this.data.allOrganization.data;
      }
    } else if (this.data.page == 'department') {
      if (value != '') {
        this.data.department = this.data.filterItem(value);
        console.log(this.data.department);
      } else {
        this.data.department = this.data.allDepartment.data;
      }
    } else if (this.data.page == 'group') {
      if (value != '') {
        this.data.group = this.data.filterItem(value);
        console.log(this.data.group);
      } else {
        this.data.group = this.data.allGroup.data;
      }
    } else if (this.data.page == 'manage-password') {
      if (value != '') {
        this.data.password = this.data.filterItem(value);
        console.log(this.data.password);
      } else {
        this.data.password = this.data.allPassword.data;
      }
    } else if (this.data.page == 'manage-role') {
      if (value != '') {
        this.data.permission = this.data.filterItem(value);
        console.log(this.data.permission);
      } else {
        this.data.permission = this.data.allPermission.data;
      }
    }


  }
  SwitchLanguage(language: string) {
    this.translate.use(language);
    this.data.language = language;
    localStorage.setItem("language", language);
    if (language == 'th') {
      this.data.province = ThailandData.province.th.changwats;
      this.data.district = ThailandData.district.th.amphoes;
      this.data.subDistrict = ThailandData.subDistrict.th.tambons;
    } else if (language == 'en') {
      this.data.province = ThailandData.province.en.changwats;
      this.data.district = ThailandData.district.en.amphoes;
      this.data.subDistrict = ThailandData.subDistrict.en.tambons;
    }
    if (this.data.organizations != undefined && this.data.province != undefined && this.data.district != undefined && this.data.subDistrict != undefined) {
      for (let item of this.data.organizations) {
        for (let provinceData of this.data.province) {
          if (item.OrganizationAddressProvince.split('|')[0].trim() == provinceData.pid) {
            item.ProvinceAddress = provinceData.name;
          }
          if (item.SendingAddressProvince.split('|')[0].trim() == provinceData.pid) {
            item.ProvinceDoc = provinceData.name;
          }
        }
        for (let districtData of this.data.district) {
          if (item.OrganizationAddressProvince.split('|')[0].trim() == districtData.changwat_pid && item.OrganizationAddressDistrict.split('|')[0].trim() == districtData.pid) {
            item.DistrictAddress = districtData.name;
          }
          if (item.SendingAddressProvince.split('|')[0].trim() == districtData.changwat_pid && item.SendingAddressDistrict.split('|')[0].trim() == districtData.pid) {
            item.DistrictDoc = districtData.name;
          }
        }
        for (let subDistrictData of this.data.subDistrict) {
          if (item.OrganizationAddressProvince.split('|')[0].trim() == subDistrictData.changwat_pid && item.OrganizationAddressDistrict.split('|')[0].trim() == subDistrictData.amphoe_pid && item.OrganizationAddressSubdistrict.split('|')[0].trim() == subDistrictData.pid) {
            item.SubDistrictAddress = subDistrictData.name;
          }
          if (item.SendingAddressProvince.split('|')[0].trim() == subDistrictData.changwat_pid && item.SendingAddressDistrict.split('|')[0].trim() == subDistrictData.amphoe_pid && item.SendingAddressSubDistrict.split('|')[0].trim() == subDistrictData.pid) {
            item.SubDistrictDoc = subDistrictData.name;
          }
        }

      }
    }

  }

  Logout() {
    this.util.Logout();
    this.router.navigate(['login']);
  }
}
