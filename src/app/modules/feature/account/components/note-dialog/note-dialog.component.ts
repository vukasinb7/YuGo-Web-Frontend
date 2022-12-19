import {Component, Inject} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {UserInfo} from "../account-info/account-info.component";

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css']
})
export class NoteDialogComponent {
  note : string = "";
  constructor(private userService : UserService, @Inject(MAT_DIALOG_DATA) public user: UserInfo) {  }

  createNote(){
    this.userService.createNote(this.user.id, this.note).subscribe({
      next:() =>{

      },
      error : (error) =>{
        if (error instanceof HttpErrorResponse) {

        }
      }
    });
  }
}
