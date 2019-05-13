import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ForgetPasswordComponent } from 'src/app/modal/forget-password/forget-password.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dialog: MatDialog,public router: Router) { }

  ngOnInit() {
  }
  Login(){
    localStorage.setItem('isLoggedin', 'true');
    this.router.navigate(['home']);
  }
  // ForgetPassword(){
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.maxWidth = "70%";

  //   this.dialog.open(ForgetPasswordComponent, dialogConfig);
  // }
}
