import {Component, EventEmitter, Inject, Input, LOCALE_ID, Output} from '@angular/core';
import {ReportModule} from "../report.module";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {PassengerService} from "../../../shared/services/passenger.service";
import {MatDialog} from "@angular/material/dialog";
import {DriverService} from "../../../shared/services/driver.service";
import {ReportService} from "../services/report.service";
import {AuthService} from "../../../core/services/auth.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  basicData:any;
  basicOptions:any
  horizontalOptions:any;
  reportInfoForm: any;
  @Input()
  public userId: number = -1;
  @Input()
  public role: string = "";
  selected:string="startTime";
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @Output()
  dateChange: EventEmitter<MatDatepickerInputEvent<any>> = new EventEmitter();

  constructor(@Inject(LOCALE_ID) private _locale: string, private _passengerService:PassengerService, public dialog: MatDialog,
              private _reportService:ReportService,private _authService:AuthService) {
    this.reportInfoForm = new FormGroup({
      startDate: new FormControl(new Date(2022,0,1), [Validators.required]),
      endDate: new FormControl(new Date(), [Validators.required])});
  }
  ngOnInit() {
    this.loadData();

  }
  loadData(){
    this._reportService.getUserRidesPerDay(this._authService.getId(),formatDate(this.reportInfoForm.get('startDate')?.value, "yyyy-MM-dd",this._locale),formatDate(this.reportInfoForm.get('endDate')?.value, "yyyy-MM-dd",this._locale)).subscribe({next:(result)=>{
      let keys = Object.keys(result);
        this.basicData = {
          labels: keys,
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: '#42A5F5',
              data: Object.values(result),
            }
          ]
        };
      }})
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#ebedef'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#ebedef'
          },
          grid: {
            color: 'rgba(255,255,255,0.2)'
          }
        },
        y: {
          ticks: {
            color: '#ebedef'
          },
          grid: {
            color: 'rgba(255,255,255,0.2)'
          }
        }
      }
    };
    this.horizontalOptions = {
      indexAxis: 'y',
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };

  }
  onDateChange(): void{
    this.dateChange.emit();
    this.loadData();
  }
}
