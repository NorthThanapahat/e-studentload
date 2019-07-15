import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './home/home.component';
import { PersonComponent } from './person/person.component';
import { LayoutComponent } from './layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupComponent } from './group/group.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartModule } from 'angular2-chartjs';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { ManagePasswordComponent } from './manage-password/manage-password.component';
import { ManageDataComponent } from './manage-data/manage-data.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { AuditLogComponent } from './audit-log/audit-log.component';
import { NgxLoadingModule } from 'ngx-loading';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatCheckboxModule, MatDatepickerModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ModalModule } from 'ngb-modal';
import { routing } from './layout-routing.module';
import { MatTableModule } from '@angular/material/table';
import { ExcelService } from './dashboard/exportAsExcelFile';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrganizationComponent } from './organization/organization.component';
import { DepartmentComponent } from './department/department.component';


@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    PersonComponent,
    LayoutComponent,
    OrganizationComponent,
    DepartmentComponent,
    GroupComponent,
    DashboardComponent,
    ManagePasswordComponent,
    ManageDataComponent,
    ManageRoleComponent,
    ChangePasswordComponent,
    AuditLogComponent],
  imports: [
    ModalModule,
    CommonModule,
    NgbPaginationModule,
    OwlDateTimeModule,
    NgxMaterialTimepickerModule,
    OwlNativeDateTimeModule,
    MatButtonModule,
    MatCardModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    NgbAlertModule,
    TranslateModule,
    FormsModule,
    ChartModule,
    routing,
    Ng2Charts,
    MatTableModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }, ExcelService
  ]

})
export class LayoutModule { }
