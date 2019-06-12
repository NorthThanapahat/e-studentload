import { Component, OnInit } from '@angular/core';
import { ApiProvider } from 'src/app/share/api/api';
import { ConfigAPI } from 'src/app/share/api/ConfigApi';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

  getDepartment:any;
  constructor(public api : ApiProvider) { }

  ngOnInit() {
    this.api.SendRequestApi(ConfigAPI.GetAllDepartment).then((res:any)=>{
      this.getDepartment = res;
    });
  }

}
