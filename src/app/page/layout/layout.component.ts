import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  click: string;
  constructor(public router: Router) { }

  ngOnInit() {
    this.click = 'home';
    this.router.navigate(['home']);
    console.log(localStorage.getItem('isLoggedin'));
  }
  Page(text) {
    console.log(text);
    this.click = text;
  }
}
