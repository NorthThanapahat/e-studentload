import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/share/provider/provider';
import { TranslateService } from '@ngx-translate/core';
import { ThailandData } from 'src/app/constant/ThailandData';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public router: Router,
    public data:DataProvider,
    public translate:TranslateService
    ) { }

  ngOnInit() {
    this.translate.setDefaultLang('th');
    if(localStorage.getItem('language')== 'th' || localStorage.getItem('language') == 'en'){
      this.translate.use(localStorage.getItem('language'));
      this.data.language = localStorage.getItem('language');
    }
   
    this.translate.get('Title').subscribe((res:string)=>{
      console.log(res);
    });
  }
  
  SwitchLanguage(language :string){
    this.translate.use(language);
    this.data.language = language;
    localStorage.setItem("language",language);
    if(language == 'th'){
      this.data.province = ThailandData.province.th.changwats;
      this.data.district = ThailandData.district.th.amphoes;
      this.data.subDistrict = ThailandData.subDistrict.th.tambons;
    }else if(language == 'en'){
      this.data.province = ThailandData.province.en.changwats;
      this.data.district = ThailandData.district.en.amphoes;
      this.data.subDistrict = ThailandData.subDistrict.en.tambons;
    }
   
  }

  Logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
