import { Component } from '@angular/core';
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  role: string = "";

  constructor(authService : AuthService) {
    this.role = authService.getRole();
  }
}
