import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../shared/services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {take} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit{
  @Input()
  public userId: number = -1;
  @Input()
  public role: string = "";
  public accountInfoForm : FormGroup;
  public editEnabled: boolean;
  TEL_REGEX:string = "^(\\+\\d{1,2}\\s?)?1?\\-?\\.?\\s?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$";
  constructor(private _snackBar: MatSnackBar, private _userService: UserService) {
    this.accountInfoForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      profilePicture: new FormControl('', [Validators.required]),
      telephoneNumber: new FormControl('', [Validators.required, Validators.pattern(this.TEL_REGEX)]),
      address: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.accountInfoForm.disable();
    this.editEnabled = false;
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() : void{
    this._userService.getUser(this.userId, this.role).pipe(take(1)).subscribe({
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
    this.loadUserData();
  }

  submitEdit() : void {
    this._userService.updateUser(this.userId, this.role, this.accountInfoForm.value).pipe(take(1)).subscribe({
      next: (info) => {
        this.accountInfoForm.patchValue({
          name: info.name,
          surname: info.surname,
          profilePicture: info.profilePicture,
          telephoneNumber: info.telephoneNumber,
          address: info.address,
          email: info.email,
        })
        this._snackBar.open("Account updated successfully!","OK");
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {

        }
      }
    });

    this.accountInfoForm.disable();
    this.editEnabled = false;
  }

  onProfilePictureError(event : any) {
    event.target.src = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";
  }
}
