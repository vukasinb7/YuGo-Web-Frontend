import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserInfo} from "../account-info/account-info.component";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {NoteDialogComponent} from "../note-dialog/note-dialog.component";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit, AfterViewInit{
  hasError : boolean = false;
  searchText : string = "";
  dataSource = new MatTableDataSource<UserInfo>();
  displayedColumns : string[] = ['id','firstname','surname','phone','email','address','role','block','note'];
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];


  constructor(private userService: UserService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  @ViewChild('usersSort') usersSort = new MatSort();
  @ViewChild('usersPaginator') usersPaginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.sort = this.usersSort;
    this.dataSource.paginator = this.usersPaginator;
  }

  loadData(){
    this.userService.getUsersInfo(this.currentPage,this.pageSize).subscribe({
      next:(info) => {
        this.dataSource.data = info.results;
        setTimeout(() => {
          this.usersPaginator.pageIndex = this.currentPage;
          this.usersPaginator.length = info.totalCount;
        });
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.hasError = true;
        }}})
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
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
    if (this.searchText != ""){
      this.searchText = this.searchText.toLowerCase();
      this.dataSource.data = this.dataSource.data.filter((user)=>{
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
