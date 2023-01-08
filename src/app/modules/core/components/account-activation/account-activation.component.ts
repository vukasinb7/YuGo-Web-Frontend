import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.css']
})
export class AccountActivationComponent {

  constructor(private _router:Router, private _dialogRef:MatDialogRef<AccountActivationComponent>) {
  }

  navigateToLogin() {
    this._router.navigate(['home'], {queryParams:{loginDialog:true}});
    this._dialogRef.close();
  }
}
