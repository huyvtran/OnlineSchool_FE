import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: 'mpin', pathMatch: 'full'},
  {
    path: 'login',
    loadChildren: () => import('../login/login.module')
    .then(m => m.LoginPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('../forgot-password/forgot-password.module')
    .then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'mpin',
    loadChildren: () => import('../mpin/mpin.module')
    .then( m => m.MpinPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('../otp/otp.module')
    .then( m => m.OtpPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('../change-password/change-password.module')
    .then( m => m.ChangePasswordPageModule)
  },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AuthRoutingModule { }
