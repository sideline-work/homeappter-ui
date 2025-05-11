import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SharedModule } from '@shared/shared.module';
import { SessionRoutingModule } from './session-routing.module';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent, ForgotPasswordComponent],
  imports: [
    SharedModule, CommonModule, SessionRoutingModule
  ]
})
export class SessionModule { }
