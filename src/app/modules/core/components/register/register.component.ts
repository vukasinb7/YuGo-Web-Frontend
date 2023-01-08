import {AfterViewInit, Component, Inject} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Observable, of} from "rxjs";
import {RegistrationService} from "../../services/registration.service";
import {UserRegistration} from "../../models/userRegistration";
import {HttpErrorResponse} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit{
  constructor(private registrationService:RegistrationService, private dialogRef:MatDialogRef<RegisterComponent>, private router: Router, @Inject(MAT_DIALOG_DATA) public userType: string) {
  }
  ngAfterViewInit(): void {
    this.registrationForm.controls.password.valueChanges.subscribe(()=>{
      this.registrationForm.controls.confirmPassword.updateValueAndValidity();
    });
  }
  TEL_REGEX:string = "^(\\+\\d{1,2}\\s?)?1?\\-?\\.?\\s?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$";
  errorMessage:string = '';
  isFinished:boolean = false;
  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, this.passwordValidator()]),
    confirmPassword: new FormControl('', [Validators.required],[this.confirmPasswordValidator()]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(this.TEL_REGEX)])
  });

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
        const passwordField = this.registrationForm.controls.password;
        if(passwordField?.valid){
          if(passwordField.value != control.value){
            return {passwordsNotMatching:{value:control.value}};
          }
        }
        return null;
      })());
    };
  }
  onSubmit(){
    let user:UserRegistration = {
      name:this.registrationForm.controls.firstName.value!,
      surname:this.registrationForm.controls.lastName.value!,
      address:this.registrationForm.controls.address.value!,
      telephoneNumber:this.registrationForm.controls.phoneNumber.value!,
      password:this.registrationForm.controls.password.value!,
      email:this.registrationForm.controls.email.value!
    };
    this.registrationService.register(user, this.userType).subscribe({
      next:()=>{
        this.isFinished = true;
        this.dialogRef.updateSize("35%");
      },
      error:(err:HttpErrorResponse)=>{this.errorMessage = err.error}
    });
  }

  navigateToLogin() {
    this.router.navigate(['home'], {queryParams:{loginDialog:true}});
    this.dialogRef.close();
  }
}
