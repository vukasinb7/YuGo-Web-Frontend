import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import {MaterialModule} from "../../../infrastructure/material.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    LoginComponent,
    NavbarComponent,
    RegisterComponent,],
  exports: [
    NavbarComponent
  ],
  imports: [
    SharedModule,
    MaterialModule
  ]
})
export class CoreModule {
}
