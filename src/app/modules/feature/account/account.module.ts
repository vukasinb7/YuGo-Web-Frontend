import { NgModule } from '@angular/core';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { PasswordComponent } from './components/password/password.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { DriverAccountComponent } from './pages/driver-account/driver-account.component';
import { AccountComponent } from './pages/account/account.component';
import { PassengerAccountComponent } from './pages/passenger-account/passenger-account.component';
import { CommonModule } from "@angular/common";
import { UsersTableComponent } from './components/users-table/users-table.component';
import { AdminUsersAccountsComponent } from './pages/admin-users-accounts/admin-users-accounts.component';
import { AdminAccountComponent } from './pages/admin-account/admin-account.component';
import { CreateNoteDialogComponent } from './components/create-note-dialog/create-note-dialog.component';
import { ViewNotesDialogComponent } from './components/view-notes-dialog/view-notes-dialog.component';
import { SharedModule } from "../../shared/shared.module";

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
    CreateNoteDialogComponent,
    AdminUsersAccountsComponent,
    ViewNotesDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    AccountComponent,
    AdminUsersAccountsComponent
  ]
})
export class AccountModule { }
