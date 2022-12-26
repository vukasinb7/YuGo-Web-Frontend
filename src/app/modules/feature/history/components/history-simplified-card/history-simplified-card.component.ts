import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {UserService} from "../../../account/services/user.service";
import {RideInfo} from "../../../account/models/RideInfo";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {HttpErrorResponse} from "@angular/common/http";
import {HistoryDetailedDialogComponent} from "../history-detailed-dialog/history-detailed-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-history-simplified-card',
  templateUrl: './history-simplified-card.component.html',
  styleUrls: ['./history-simplified-card.component.css']
})
export class HistorySimplifiedCardComponent implements OnInit{
  hasError : boolean = false;
  selected:string="startTime";
  accountInfoForm : FormGroup;
  dataSource= new MatTableDataSource<RideInfo>();
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  obs: Observable<any>;
  @Output()
  dateChange: EventEmitter<MatDatepickerInputEvent<any>> = new EventEmitter();

  constructor(private userService:UserService,public dialog: MatDialog) {
    this.accountInfoForm = new FormGroup({
      startDate: new FormControl(new Date(2022,0,1), [Validators.required]),
      endDate: new FormControl(new Date(), [Validators.required])});
    this.obs = this.dataSource.connect();
  }

  @ViewChild('ridesPaginator') ridesPaginator!: MatPaginator;
  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit(){

    this.dataSource.paginator = this.ridesPaginator;
  }

  loadData(){
    this.userService.getPassengerRides(1,this.currentPage,this.pageSize,this.selected,this.dateToString(this.accountInfoForm.get('startDate')?.value),this.dateToString(this.accountInfoForm.get('endDate')?.value)).subscribe({
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

  onDateChange(): void{
    this.dateChange.emit();
    this.loadData();
  }

  dateToString(date:Date):string{
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth()+1),
      this.padTo2Digits(date.getDate())
    ].join('-')
  }
  padTo2Digits(num:number) {
    return num.toString().padStart(2, '0');
  }

  viewDetails(ride: any) {
    this.dialog.open(HistoryDetailedDialogComponent,{
      data:ride,
    })

  }
}
