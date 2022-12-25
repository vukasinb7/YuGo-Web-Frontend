import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserInfo} from "../../models/UserInfo";
import {MatTableDataSource} from "@angular/material/table";
import {Note} from "../../models/Note";
import {MatSort} from "@angular/material/sort";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-view-notes-dialog',
  templateUrl: './view-notes-dialog.component.html',
  styleUrls: ['./view-notes-dialog.component.css']
})
export class ViewNotesDialogComponent implements OnInit, AfterViewInit{
  dataSource = new MatTableDataSource<Note>();
  displayedColumns : string[] = ['id','date','message'];
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  constructor(private userService : UserService, @Inject(MAT_DIALOG_DATA) public user: UserInfo) {  }

  ngOnInit(): void {
    this.getNotes();
  }

  @ViewChild('notesSort') notesSort = new MatSort();
  @ViewChild('notesPaginator') notesPaginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.sort = this.notesSort;
    this.dataSource.paginator = this.notesPaginator;
  }

  getNotes(){
    this.userService.getNotes(this.user.id, this.currentPage,this.pageSize).subscribe({
      next:(info) => {
        this.dataSource.data = info.results;
        setTimeout(() => {
          this.notesPaginator.pageIndex = this.currentPage;
          this.notesPaginator.length = info.totalCount;
        });
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {

        }}})
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getNotes();
  }

  dateToString(date:Date):string{
    let dateString=date.toString().split(",");
    return [dateString[2], dateString[1], dateString[0]].join(".")+". "+[dateString[3],dateString[4]].join(":");
  }
}
