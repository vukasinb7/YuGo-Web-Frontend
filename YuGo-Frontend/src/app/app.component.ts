import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'YuGo-Frontend';

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(LoginComponent);
  }
}
