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

  constructor(public dialog: MatDialog) {}

  openLoginDialog() {
    this.dialog.open(LoginComponent, {
      height: '400px',
      width: '500px',
    });
  }

  openRegisterDialog(){
    this.dialog.open(RegisterComponent, {
      width: '50%'
    });
  }
}
