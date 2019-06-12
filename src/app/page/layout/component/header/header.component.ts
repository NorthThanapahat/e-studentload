import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/share/provider/provider';
import { TranslateService } from '@ngx-translate/core';

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

    this.translate.get('Title').subscribe((res:string)=>{
      console.log(res);
    });
  }
  
  SwitchLanguage(language :string){
    this.translate.use(language);
    this.data.language = language;
  }

  Logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
