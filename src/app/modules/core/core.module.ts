import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    FooterComponent],
  exports: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CoreModule {
}
