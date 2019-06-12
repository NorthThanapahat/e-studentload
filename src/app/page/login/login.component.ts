import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/share/provider/provider';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dialog: MatDialog,
    public data:DataProvider,public router: Router) { }

  ngOnInit() {
  }
  Login(){
    localStorage.setItem('isLoggedin', 'true');
    this.router.navigate(['home']);
  }
  
}
