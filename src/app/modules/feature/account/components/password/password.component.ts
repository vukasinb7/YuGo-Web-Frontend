import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../../../core/services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  passwordForm : FormGroup;
  editEnabled: boolean
  constructor(private userService : UserService, private authService: AuthService) {
    this.passwordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
    this.passwordForm.disable();
    this.editEnabled = false;
  }

  enableEdit() : void{
    this.passwordForm.enable();
    this.editEnabled = true;
  }

  cancelEdit() : void{
    this.passwordForm.disable();
    this.editEnabled = false;
  }

  submitEdit() : void {
    if (this.passwordForm.controls['confirmPassword'].value != this.passwordForm.controls['newPassword'].value || this.passwordForm.invalid){

    }
    else {
      this.userService.changePassword(this.authService.getId(), {
        "oldPassword": this.passwordForm.controls['oldPassword'].value,
        "newPassword": this.passwordForm.controls['newPassword'].value
      }).subscribe({
        next: (info) => {

        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {

          }
        }
      })

      this.passwordForm.disable();
      this.editEnabled = false;
    }
  }
}
