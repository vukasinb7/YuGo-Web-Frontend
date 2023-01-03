import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialogRef} from "@angular/material/dialog";
import {take} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  errorMessage:string = '';

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router, private dialogRef:MatDialogRef<LoginComponent>) {}
  submitLogin(){
    const loginVal = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    if (this.loginForm.valid) {
      this.authService.logIn(loginVal).pipe(take(1)).subscribe({
        next: (result) => {
          localStorage.setItem('user', result.accessToken);
          this.authService.setUser();
          this.dialogRef.close(this.authService.getRole());
          this.router.navigate(['/']);

        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this.errorMessage = error.error;
          }
        },
      });
    }
  }
  changeToForgotPassword() {
    document.getElementById("login-item")?.classList.remove("active");
    document.getElementById("forgot-password-item")?.classList.add("active");
  }

  navigateToRegister() {
    this.router.navigate(['home'], {queryParams:{registerDialog:true}});
    this.dialogRef.close();
  }
}
