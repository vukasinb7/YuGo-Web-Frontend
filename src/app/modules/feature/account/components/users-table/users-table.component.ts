import {Component, OnInit} from '@angular/core';
import {UserInfo} from "../account-info/account-info.component";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit{
  hasError : boolean;
  totalCount : number;
  users : UserInfo[];
  displayedColumns : string[] = ['id','firstname','surname','phone','email','address','role','actions'];

  constructor(private userService: UserService) {
    this.hasError = false;
    this.users = new Array<UserInfo>();
    this.totalCount = 0;
  }

  ngOnInit(): void {
    this.userService.getUsersInfo(0,5).subscribe({
      next:(info) => {
        console.log(info.results);
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
}

export interface AllUsersInfo {
  totalCount : number;
  results: UserInfo[];
}
