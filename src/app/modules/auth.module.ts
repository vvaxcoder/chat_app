import { AuthTabsComponent } from './../components/auth-tabs/auth-tabs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AuthTabsComponent],
  exports: [
    AuthTabsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
