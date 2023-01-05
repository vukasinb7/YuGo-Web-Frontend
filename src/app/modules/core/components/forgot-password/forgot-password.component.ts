import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {UserService} from "../../../shared/services/user.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Observable, of, take} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  userId: number = -1;
  passwordForm : FormGroup;

  errorMessage:string = '';
  constructor(private _userService : UserService, private _authService: AuthService, private _router: Router) {
    this.passwordForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required, this.passwordValidator()]),
      confirmPassword: new FormControl('', [Validators.required], [this.confirmPasswordValidator()]),
    });
  }

  private passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(control.value.length < 6){
        return {minLength:{value:control.value}};
      }
      if(control.value.length > 20){
        return {maxLength:{value:control.value}};
      }
      let whiteSpaceRegex:RegExp = new RegExp("^(?!.* ).{6,20}$")
      if(!whiteSpaceRegex.test(control.value)){
        return {whitespace:{value:control.value}};
      }
      return null;
    };
  }

  private confirmPasswordValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of((() => {
        const passwordField = this.passwordForm.controls['newPassword'];
        if(passwordField?.valid){
          if(passwordField.value != control.value){
            return {passwordsNotMatching:{value:control.value}};
          }
        }
        return null;
      })());
    };
  }

  submitEdit() : void {
    if (this.passwordForm.invalid){

    }
    else {
      this._userService.changePassword(this.userId, {
        "oldPassword": this.passwordForm.controls['currentPassword'].value,
        "newPassword": this.passwordForm.controls['newPassword'].value
      }).pipe(take(1)).subscribe({
        next: (info) => {
          if (this.userId == this._authService.getId()){
            localStorage.removeItem('user');
            this._authService.setUser();
            this._router.navigate(['/']);
            this._authService.logOut().subscribe({
              next: (result) => {

              },
              error: (error) => {
                console.log(error);
              },
            });
          }
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this.errorMessage = error.error.message;
          }
        }
      })
    }
  }

}
