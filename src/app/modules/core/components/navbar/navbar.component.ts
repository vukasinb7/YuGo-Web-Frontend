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
  userType="";
  routeQueryParams: Subscription;
  loginDialog?: MatDialogRef<LoginComponent>;
  registerDialog?: MatDialogRef<RegisterComponent>;

  constructor(public dialog: MatDialog, private authService: AuthService, private router: Router, private route:ActivatedRoute) {
    this.routeQueryParams = route.queryParams.subscribe(params => {
      if(params['loginDialog']){
        this.registerDialog?.close();
        this.openLoginDialog();
      }
    });
    this.routeQueryParams = route.queryParams.subscribe(params => {
      if(params['registerDialog']){
        this.loginDialog?.close();
        this.openRegisterDialog();
      }
    });
  }
  ngOnInit() {
    this.authService.userState$.subscribe(value => this.userType = value);
  }

  openLoginDialog() {
    this.loginDialog = this.dialog.open(LoginComponent);
    this.loginDialog.afterClosed().subscribe(result => {
      this.router.navigate(['.'], {relativeTo: this.route});
    });
  }

  openRegisterDialog(){
    this.registerDialog = this.dialog.open(RegisterComponent, {
      width: '30%',
      data: 'PASSENGER'
    });
    this.registerDialog.afterClosed().subscribe(result => {
      this.router.navigate(['.'], {relativeTo: this.route});
    });
  }

  logOut(){
    localStorage.removeItem('user');
    this.authService.setUser();
    this.router.navigate(['/']);
    this.authService.logOut().subscribe({
      next: (result) => {

      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
