import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { PasswordComponent } from './components/password/password.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { DriverAccountComponent } from './pages/driver-account/driver-account.component';
import { AccountComponent } from './pages/account/account.component';
import { PassengerAccountComponent } from './pages/passenger-account/passenger-account.component';
import { AdminAccountComponent } from './pages/admin-account/admin-account.component';
import { CommonModule } from "@angular/common";
import { UsersTableComponent } from './components/users-table/users-table.component';
import { NoteDialogComponent } from './components/note-dialog/note-dialog.component';

@NgModule({
  declarations: [
    AccountInfoComponent,
    PasswordComponent,
    DocumentsComponent,
    DriverAccountComponent,
    PassengerAccountComponent,
    AdminAccountComponent,
    AccountComponent,
    UsersTableComponent,
    NoteDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    AccountComponent
  ]
})
export class AccountModule { }
