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
  hasError : boolean;
  editEnabled: boolean
  constructor(private userService: UserService) {
    this.accountInfoForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });
    this.accountInfoForm.disable();
    this.editEnabled = false;
    this.hasError = false;
  }

  ngOnInit(): void {
    this.userService.getPassengerInfo().subscribe({
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

  enableEdit() : void{
    this.accountInfoForm.enable();
    this.editEnabled = true;
  }

  cancelEdit() : void{
    this.accountInfoForm.disable();
    this.editEnabled = false;
    this.ngOnInit();
  }

  submitEdit() : void {
    this.accountInfoForm.disable();
    this.editEnabled = false;
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
  role: string;
  blocked: boolean;
}
