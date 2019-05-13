import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';
import { PersonComponent } from './person/person.component';
import { DepartmentComponent } from './department/department.component';
import { SideComponent } from './side/side.component';
import { GroupComponent } from './group/group.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {path:'',redirectTo:'home',pathMatch:"prefix"},
      {path:'home', component:HomeComponent},
      {path:'person', component:PersonComponent},
      {path:'department', component:DepartmentComponent},
      {path:'side', component:SideComponent},
      {path:'group', component:GroupComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
