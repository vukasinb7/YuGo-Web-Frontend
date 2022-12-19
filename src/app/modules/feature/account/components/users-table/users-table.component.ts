import {Component, OnInit} from '@angular/core';
import {UserInfo} from "../account-info/account-info.component";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {NoteDialogComponent} from "../note-dialog/note-dialog.component";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit{
  hasError : boolean = false;
  searchText : string = "";
  totalCount : number = 0;
  users : UserInfo[] = [];
  displayedColumns : string[] = ['id','firstname','surname','phone','email','address','role','block','note'];

  constructor(private userService: UserService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userService.getUsersInfo(0,5).subscribe({
      next:(info) => {
        this.users = info.results
        this.totalCount = info.totalCount;
        },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.hasError = true;
        }}})
  }

  blockUser(userId : number){
    this.userService.blockUser(userId).subscribe({
      next:() =>{
        this.ngOnInit();
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.hasError = true;
        }}});
  }

  unblockUser(userId : number){
    this.userService.unblockUser(userId).subscribe({
      next:() =>{
        this.ngOnInit();
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.hasError = true;
        }}});
  }

  createNote(user :UserInfo){
    this.dialog.open(NoteDialogComponent,{
      width:'40%',
      data:user
    });
  }

  filterUsers(){
    console.log(this.searchText);
    if (this.searchText != ""){
      this.searchText = this.searchText.toLowerCase();
      this.users = this.users.filter((user)=>{
        return user.id.toString().includes(this.searchText) ||
          user.surname.toLowerCase().includes(this.searchText) ||
          user.name.toLowerCase().includes(this.searchText) ||
          user.email.toLowerCase().includes(this.searchText) ||
          user.address.toLowerCase().includes(this.searchText) ||
          user.telephoneNumber.includes(this.searchText) ||
          user.role.toLowerCase().includes(this.searchText);
      })
    }
    else{
      this.ngOnInit();
    }
  }
}

export interface AllUsersInfo {
  totalCount : number;
  results: UserInfo[];
}
