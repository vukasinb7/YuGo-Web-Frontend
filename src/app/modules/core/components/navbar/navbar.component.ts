import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  userType='UNREGISTERED';

  constructor(public dialog: MatDialog, private authService: AuthService) {

  }

  openLoginDialog() {
    this.dialog.open(LoginComponent).afterClosed().subscribe(
      value =>{
        var asd =  this.authService.getRole();
      this.userType = asd});
  }

  openRegisterDialog(){
    this.dialog.open(RegisterComponent, {
      width: '50%'
    });
  }
  authUnregisteredUser(){
    this.userType='UNREGISTERED';
  }
  authPassenger(){
    this.userType='PASSENGER';
  }
  authDriver(){
    this.userType='DRIVER';
  }
  authAdmin(){
    this.userType='ADMIN';
  }
}
