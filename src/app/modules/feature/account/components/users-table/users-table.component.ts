import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../../../shared/services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {UserInfo} from "../../../../shared/models/UserInfo";
import {CreateNoteDialogComponent} from "../create-note-dialog/create-note-dialog.component";
import {ViewNotesDialogComponent} from "../view-notes-dialog/view-notes-dialog.component";
import {RegisterComponent} from "../../../../core/components/register/register.component";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit, AfterViewInit {
  hasError: boolean = false;
  searchText: string = "";
  dataSource = new MatTableDataSource<UserInfo>();
  displayedColumns: string[] = ['id', 'firstname', 'surname', 'phone', 'email', 'address', 'role', 'block', 'note'];
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

  loadData() {
    this.userService.getUsers(this.currentPage, this.pageSize).subscribe({
      next: (info) => {
        this.dataSource.data = info.results;
        setTimeout(() => {
          this.usersPaginator.pageIndex = this.currentPage;
          this.usersPaginator.length = info.totalCount;
        });
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.hasError = true;
        }
      }
    })
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  blockUser(userId: number) {
    this.userService.blockUser(userId).subscribe({
      next: () => {
        this.loadData();
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.hasError = true;
        }
      }
    });
  }

  unblockUser(userId: number) {
    this.userService.unblockUser(userId).subscribe({
      next: () => {
        this.loadData();
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.hasError = true;
        }
      }
    });
  }

  createNote(user: UserInfo) {
    this.dialog.open(CreateNoteDialogComponent, {
      width: '40%',
      data: user
    });
  }

  showNotes(user: UserInfo) {
    this.dialog.open(ViewNotesDialogComponent, {
      width: '40%',
      data: user
    });
  }


  createDriver(){
    this.dialog.open(RegisterComponent,{
      width:'30%',
      data: 'DRIVER'
    });
  }

  createPassenger(){
    this.dialog.open(RegisterComponent,{
      width:'30%',
      data: 'PASSENGER'
    });
  }

  filterUsers(){
    if (this.searchText != ""){
      this.searchText = this.searchText.toLowerCase();
      this.dataSource.data = this.dataSource.data.filter((user) => {
        return user.id.toString().includes(this.searchText) ||
          user.surname.toLowerCase().includes(this.searchText) ||
          user.name.toLowerCase().includes(this.searchText) ||
          user.email.toLowerCase().includes(this.searchText) ||
          user.address.toLowerCase().includes(this.searchText) ||
          user.telephoneNumber.includes(this.searchText) ||
          user.role.toLowerCase().includes(this.searchText);
      })
    } else {
      this.loadData();
    }
  }
}
