import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../shared/services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit{
  accountInfoForm : FormGroup;
  editEnabled: boolean;
  constructor(private userService: UserService, private authService: AuthService) {
    this.accountInfoForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      profilePicture: new FormControl('', [Validators.required]),
      telephoneNumber: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });
    this.accountInfoForm.disable();
    this.editEnabled = false;
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() : void{
    this.userService.getUser(this.authService.getId()).subscribe({
      next:(info) => {
        this.accountInfoForm.patchValue({
          name: info.name,
          surname: info.surname,
          profilePicture: info.profilePicture,
          telephoneNumber: info.telephoneNumber,
          address: info.address,
          email: info.email,
        })},
      error: (error) => {
        if (error instanceof HttpErrorResponse) {

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
    if (this.accountInfoForm.valid) {
      this.userService.updateUser(this.accountInfoForm.value).subscribe({
        next: (info) => {
          this.accountInfoForm.patchValue({
            name: info.name,
            surname: info.surname,
            profilePicture: info.profilePicture,
            telephoneNumber: info.telephoneNumber,
            address: info.address,
            email: info.email,
          })
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {

          }
        }
      });

      this.accountInfoForm.disable();
      this.editEnabled = false;
    }
    else{

    }
  }

  onProfilePictureError(event : any) {
    event.target.src = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";
  }
}
