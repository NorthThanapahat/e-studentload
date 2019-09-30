import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { DataProvider } from './share/provider/provider';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './share/auth.guard';
import { ApiProvider } from './share/api/api';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ChartModule } from 'angular2-chartjs';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { LoadingComponent } from './modal/loading/loading.component';
import { UtilProvider } from './share/util';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { AlertComponent } from './modal/forget-password/alert.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ModalModule } from 'ngx-bootstrap/modal';
import {NgxPaginationModule} from 'ngx-pagination';
import { LoginPageService } from './share/login-page/login-page.service';
import { HomeService } from './share/api/home-service/home-service';
import { MatDatepickerModule } from '@angular/material';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SplitPipe } from './share/pipe/split.pipe';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,'../assets/i18n/','.json');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    LoadingComponent,
    LoadingScreenComponent],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    Ng2Charts,
    NgxPaginationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [DataProvider, AuthGuard, ApiProvider, UtilProvider,LoginPageService,HomeService,MatDatepickerModule],
  entryComponents: [AlertComponent, LoadingComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
