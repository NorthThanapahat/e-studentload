import { Component, OnInit } from '@angular/core';
import { ApiProvider } from 'src/app/share/api/api';
import { UtilProvider } from 'src/app/share/util';
import { ConfigAPI } from 'src/app/share/api/ConfigApi';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  allGroup:any;
  constructor(public api : ApiProvider,
    public util:UtilProvider) { }

  ngOnInit() {
    this.api.SendRequestApi(ConfigAPI.GetAllGroup).then((res:any)=>{
      this.allGroup = res;
      
    });
  }

}
