import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterPageComponent} from "./register-page/register-page.component";
import {DashComponent} from "./dash/dash.component";
import {AuthGuard} from "./helpers/auth.guard";
import {LoginPageComponent} from "./login-page/login-page.component";

const routes: Routes = [
  // {
  //   path: '',
  //   component: DashComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
