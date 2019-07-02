import { Component, OnInit } from '@angular/core';
import { ApiProvider } from 'src/app/share/api/api';
import { DataProvider } from 'src/app/share/provider/provider';
import { UtilProvider } from 'src/app/share/util';
import { ConfigAPI } from 'src/app/share/api/ConfigApi';

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.css']
})
export class ManageRoleComponent implements OnInit {

  permission:any;
  constructor(
    public api:ApiProvider,
    public data:DataProvider,
    public util:UtilProvider
  ) { 
    this.data.page = 'manage-role';

  }

  ngOnInit() {

    this.api.SendRequestApi(`${ConfigAPI.GetAllpermission}?token=${this.util.GetAccessToken()}`).then((res:any)=>{
      console.log(res);
      
      if(res.successful){
        this.permission = res;
      }else{
        // if (res.code == '-2146233088') {
        //   this.util.DoError();
        // }
      }
    }); 
  }

  Edit(item){
    console.log(item);
  }

}
