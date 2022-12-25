import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../account/services/user.service";
import {DataSource} from "@angular/cdk/collections";
import {RideInfo} from "../../../account/models/RideInfo";
import {MatTableDataSource} from "@angular/material/table";
import {UserInfo} from "../../../account/models/UserInfo";
import {Observable} from "rxjs";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {HttpErrorResponse} from "@angular/common/http";
import {HistoryDetailedDialogComponent} from "../history-detailed-dialog/history-detailed-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-history-simplified-card',
  templateUrl: './history-simplified-card.component.html',
  styleUrls: ['./history-simplified-card.component.css']
})
export class HistorySimplifiedCardComponent implements OnInit{
  hasError : boolean = false;
  dataSource= new MatTableDataSource<RideInfo>();
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  obs: Observable<any>;
  constructor(private userService:UserService,public dialog: MatDialog) {
    this.obs = this.dataSource.connect();
  }
  @ViewChild('ridesPaginator') ridesPaginator!: MatPaginator;
  ngOnInit() {
    this.dataSource.paginator = this.ridesPaginator;
    this.loadData();
  }
  loadData(){
    this.userService.getPassengerRides(1,0,5,"date","1/1/2022","12/31/2022").subscribe({
      next:(results)=> {
        this.dataSource.data=results.results;
        setTimeout(() => {
          this.ridesPaginator.pageIndex = this.currentPage;
          this.ridesPaginator.length = results.totalCount;
        });

      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.hasError = true;
        }}
    })
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }
  openDetailedDialog(){
    this.dialog.open(HistoryDetailedDialogComponent, {
      width: '75%',
      backdropClass: 'backdropBackground'
    });
  }


}
