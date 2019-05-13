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

@NgModule({
  declarations: [HeaderComponent,HomeComponent,PersonComponent,LayoutComponent, DepartmentComponent, SideComponent, GroupComponent],
  imports: [
    CommonModule,LayoutRoutingModule,FormsModule
  ],
  providers:[{provide:LocationStrategy,useClass:HashLocationStrategy}]

})
export class LayoutModule { }
