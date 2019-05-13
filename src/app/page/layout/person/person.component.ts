import { Component, OnInit } from '@angular/core';
import { ApiProvider } from 'src/app/share/api/api';
import { ConfigAPI } from 'src/app/share/api/ConfigApi';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  
  constructor(public api : ApiProvider) { }

  ngOnInit() {
    this.api.SendRequestApi(ConfigAPI.GetAllPerson).then((res:any)=>{
      console.log(res);
    });
  }

}
