import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { LayoutComponent } from './page/layout/layout.component';
import { AuthGuard } from './share/auth.guard';

const routes: Routes = [
  { path :'',loadChildren:'./page/layout/layout.module#LayoutModule',canActivate:[AuthGuard]},
  { path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
