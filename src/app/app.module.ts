import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { DataProvider } from './share/provider/provider';
import {MatDialogModule} from '@angular/material/dialog';
import { ForgetPasswordComponent } from './modal/forget-password/forget-password.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthGuard } from './share/auth.guard';
import { ApiProvider } from './share/api/api';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ChartModule } from 'angular2-chartjs';
import { ChartsModule as Ng2Charts } from 'ng2-charts';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPasswordComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartModule,
    Ng2Charts
  ],
  providers: [DataProvider,AuthGuard,ApiProvider],
  entryComponents:[ForgetPasswordComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
