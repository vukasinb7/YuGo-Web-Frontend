import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit{
  accountInfoForm : FormGroup;
  editDisabled : boolean;
  hasError : boolean;
  constructor(private userService: UserService) {
    this.accountInfoForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });
    this.accountInfoForm.disable();
    this.editDisabled = true;
    this.hasError = false;
  }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe({
      next:(info) => {
        this.accountInfoForm.patchValue({
        firstname: info.name,
        surname: info.surname,
        phone: info.telephoneNumber,
        address: info.address,
        email: info.email,
      })},
      error: (error) => {
      if (error instanceof HttpErrorResponse) {
        this.hasError = true;
      }}})
  }
}

export interface UserInfo {
  _id: number;
  name: string;
  surname: string;
  profilePicture: string;
  telephoneNumber: string;
  email: string;
  address: string;
}
