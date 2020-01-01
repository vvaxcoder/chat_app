import { AuthService } from './../services/auth.service';
import { AuthTabsComponent } from './../components/auth-tabs/auth-tabs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AuthTabsComponent, LoginComponent, SignupComponent],
  exports: [
    AuthTabsComponent, LoginComponent, SignupComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [AuthService]
})
export class AuthModule { }
