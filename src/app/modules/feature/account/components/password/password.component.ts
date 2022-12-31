import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../shared/services/user.service";
import {AuthService} from "../../../../core/services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  @Input()
  public userId: number = -1;
  passwordForm : FormGroup;
  editEnabled: boolean
  constructor(private _userService : UserService) {
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
      this._userService.changePassword(this.userId, {
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
