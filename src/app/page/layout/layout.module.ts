import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './home/home.component';
import { PersonComponent } from './person/person.component';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { FormsModule } from '@angular/forms';
import { DepartmentComponent } from './department/department.component';
import { SideComponent } from './side/side.component';
import { GroupComponent } from './group/group.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartModule } from 'angular2-chartjs';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { ManagePasswordComponent } from './manage-password/manage-password.component';
import { ManageDataComponent } from './manage-data/manage-data.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { AuditLogComponent } from './audit-log/audit-log.component';




@NgModule({
  declarations: [HeaderComponent,HomeComponent,PersonComponent,LayoutComponent, DepartmentComponent, SideComponent, GroupComponent, DashboardComponent, ManagePasswordComponent, ManageDataComponent, ManageRoleComponent, AuditLogComponent],
  imports: [
    CommonModule,LayoutRoutingModule,FormsModule,ChartModule,Ng2Charts
  ],
  providers:[{provide:LocationStrategy,useClass:HashLocationStrategy}]

})
export class LayoutModule { }
