import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { PassengerRegisterComponent } from '../register/passenger-register/passenger-register.component';
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
  registerDialog?: MatDialogRef<PassengerRegisterComponent>;

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
      minHeight: '420px',
      height:'50%'
    });
    this.loginDialog.afterClosed().subscribe(result => {
      this._router.navigate(['.'], {relativeTo: this._route});
      this.ngOnInit();
    });
  }

  openRegisterDialog(){
    this.registerDialog = this._dialog.open(PassengerRegisterComponent, {
      width: '40%',
      minWidth: '400px',
      minHeight: '500px',
      data: true
    });
    this.registerDialog.afterClosed().subscribe(result => {
      this._router.navigate(['.'], {relativeTo: this._route});
    });
  }

  logOut(){
    this._authService.logOut().subscribe({
      next: (result) => {
        localStorage.removeItem('user');
        this._authService.setUser();
        this._router.navigate(['/']);
      },
      error: (error) => {
        localStorage.removeItem('user');
        this._authService.setUser();
        this._router.navigate(['/']);
      },
    });
  }
}
