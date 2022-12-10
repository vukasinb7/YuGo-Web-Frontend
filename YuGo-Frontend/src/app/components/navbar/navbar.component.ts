import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  userType='unregistred';

  constructor(public dialog: MatDialog) {}

  openLoginDialog() {
    this.dialog.open(LoginComponent);
  }

  openRegisterDialog(){
    this.dialog.open(RegisterComponent, {
      width: '50%'
    });
  }
  authUnregistredUser(){
    this.userType='unregistred';
  }
  authPassenger(){
    this.userType='passenger';
  }
  authDriver(){
    this.userType='driver';
  }
  authAdmin(){
    this.userType='admin';
  }
}
