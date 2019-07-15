import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';
import { PersonComponent } from './person/person.component';
import { OrganizationComponent } from './organization/organization.component';
import { GroupComponent } from './group/group.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagePasswordComponent } from './manage-password/manage-password.component';
import { ManageDataComponent } from './manage-data/manage-data.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { AuditLogComponent } from './audit-log/audit-log.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DepartmentComponent } from './department/department.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {path:'',redirectTo:'home',pathMatch:"prefix"},
      {path:'home', component:HomeComponent},
      {path:'person', component:PersonComponent},
      {path:'organization', component:OrganizationComponent},
      {path:'department', component:DepartmentComponent},
      {path:'group', component:GroupComponent},
      {path:'dashboard', component:DashboardComponent},
      {path:'manage-password', component:ManagePasswordComponent},
      {path:'manage-data', component:ManageDataComponent},
      {path:'manage-role', component:ManageRoleComponent},
      {path:'audit-log', component:AuditLogComponent},
      {path:'change-password', component:ChangePasswordComponent}
    ]
  }
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
