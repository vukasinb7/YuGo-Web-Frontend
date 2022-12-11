import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    LoginComponent,
    NavbarComponent,
    RegisterComponent],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CoreModule {
}
