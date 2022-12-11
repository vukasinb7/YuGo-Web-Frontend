import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {AccountComponent} from "./pages/account.component";
import { AccountInfoComponent } from './components/account-info/account-info.component';
import {NgOptimizedImage} from "@angular/common";
import { PasswordComponent } from './components/password/password.component';
import { DocumentsComponent } from './components/documents/documents.component';

@NgModule({
  declarations: [
    AccountComponent,
    AccountInfoComponent,
    PasswordComponent,
    DocumentsComponent],
  imports: [
    SharedModule,
    NgOptimizedImage
  ],
  exports: [
      AccountComponent
  ]
})
export class AccountModule { }
