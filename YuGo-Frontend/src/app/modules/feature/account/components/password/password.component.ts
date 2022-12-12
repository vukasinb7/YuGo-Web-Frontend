import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  passwordForm : FormGroup;
  editEnabled: boolean
  constructor() {
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
    this.passwordForm.disable();
    this.editEnabled = false;
  }
}
