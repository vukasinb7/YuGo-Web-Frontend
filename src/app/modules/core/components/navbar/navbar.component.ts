import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  role: string ="";
  userId: number = -1;
  routeQueryParams: Subscription;
  loginDialog?: MatDialogRef<LoginComponent>;
  registerDialog?: MatDialogRef<RegisterComponent>;

  constructor(private _dialog: MatDialog, private _authService: AuthService, private _router: Router, private _route:ActivatedRoute) {
    this.routeQueryParams = _route.queryParams.subscribe(params => {
      if(params['loginDialog']){
        this.registerDialog?.close();
        this.openLoginDialog();
      }
    });
    this.routeQueryParams = _route.queryParams.subscribe(params => {
      if(params['registerDialog']){
        this.loginDialog?.close();
        this.openRegisterDialog();
      }
    });
  }
  ngOnInit() {
    this._authService.userState$.subscribe(value => this.role = value);
    this.userId = this._authService.getId();
  }

  openLoginDialog() {
    this.loginDialog = this._dialog.open(LoginComponent,{
      width: '20%',
      minWidth: '400px',
      height:'45%'
    });
    this.loginDialog.afterClosed().subscribe(result => {
      this._router.navigate(['.'], {relativeTo: this._route});
      this.ngOnInit();
    });
  }

  openRegisterDialog(){
    this.registerDialog = this._dialog.open(RegisterComponent, {
      width: '40%',
      minWidth: '400px',
      data: 'PASSENGER'
    });
    this.registerDialog.afterClosed().subscribe(result => {
      this._router.navigate(['.'], {relativeTo: this._route});
    });
  }

  logOut(){
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
}
