import {Component, EventEmitter, Inject, LOCALE_ID, OnInit, Output} from '@angular/core';
import {ReportModule} from "../report.module";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {PassengerService} from "../../../shared/services/passenger.service";
import {ReportService} from "../services/report.service";
import {formatDate} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{
  basicData:any;
  basicOptions:any
  horizontalOptions:any;
  reportInfoForm: any;
  public userId = -1;
  public role = "";
  selected="rides";
  @Output()
  dateChange: EventEmitter<MatDatepickerInputEvent<any>> = new EventEmitter();
  diagramTitle= "";
  total="";
  chartType="bar";
  average="";



  constructor(@Inject(LOCALE_ID) private _locale: string, private _passengerService:PassengerService,
              private _reportService:ReportService,private _route: ActivatedRoute) {
    this.reportInfoForm = new FormGroup({
      startDate: new FormControl(new Date(2022,0,1), [Validators.required]),
      endDate: new FormControl(new Date(), [Validators.required])});
  }
  ngOnInit() {
    this._route.params.subscribe(params => {
      this.userId = Number.parseInt(params['userId'])
      this.role = params['role'];
    })
    this.loadData();
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
  loadData() {
    if (this.selected == "rides") {
      this.diagramTitle="Rides Per Day";
      if (this.role=="ADMIN")
      {
        this._reportService.getTotalRidesPerDay(formatDate(this.reportInfoForm.get('startDate')?.value,
          "yyyy-MM-dd", this._locale), formatDate(this.reportInfoForm.get('endDate')?.value, "yyyy-MM-dd",
          this._locale)).subscribe({
          next: (result) => {
            const keys: string[] = [];
            result.keys.forEach(function (value) {
              const date = String(value).split(',');
              keys.push(String(date[0]) + "-" + String(date[1]) + "-" + String(date[2]));
            });
            this.basicData = {
              labels: keys,
              datasets: [
                {
                  label: 'Number Of Rides',
                  backgroundColor: '#FAD02C',
                  borderColor:'rgba(233,234,236,0.2)',
                  tension: .4,
                  data: result.values,
                }
              ]
            };
            const sum = result.values.reduce((a, b) => a + b, 0);
            this.total="Total number of rides: "+sum;
            this.average="Average number of rides: "+Math.round((sum/keys.length)*100)/100;
          }
        });
      }
      else {
        this._reportService.getUserRidesPerDay(this.userId, formatDate(this.reportInfoForm.get('startDate')?.value,
          "yyyy-MM-dd", this._locale), formatDate(this.reportInfoForm.get('endDate')?.value, "yyyy-MM-dd",
          this._locale)).subscribe({
          next: (result) => {
            const keys: string[] = [];
            result.keys.forEach(function (value) {
              const date = String(value).split(',');
              keys.push(String(date[0]) + "-" + String(date[1]) + "-" + String(date[2]));
            });
            this.basicData = {
              labels: keys,
              datasets: [
                {
                  label: 'Number Of Rides',
                  backgroundColor: '#FAD02C',
                  borderColor:'rgba(233,234,236,0.2)',
                  tension: .4,
                  data: result.values,
                }
              ]
            };
            const sum = result.values.reduce((a, b) => a + b, 0);
            this.total="Total number of rides: "+sum;
            this.average="Average number of rides: "+Math.round((sum/keys.length)*100)/100;
          }
        });
      }
      }
    else if (this.selected=="kilometers")
    {
      this.diagramTitle="Kilometers Per Day";
      if (this.role=="ADMIN"){
        this._reportService.getTotalKilometersPerDay(formatDate(this.reportInfoForm.get('startDate')?.value,
          "yyyy-MM-dd", this._locale), formatDate(this.reportInfoForm.get('endDate')?.value, "yyyy-MM-dd",
          this._locale)).subscribe({
          next: (result) => {
            const keys: string[] = [];
            result.keys.forEach(function (value) {
              const date = String(value).split(',');
              keys.push(String(date[0]) + "-" + String(date[1]) + "-" + String(date[2]));
            });
            this.basicData = {
              labels: keys,
              datasets: [
                {
                  label: 'Distance',
                  backgroundColor: '#FAD02C',
                  borderColor:'rgba(233,234,236,0.2)',
                  tension: .4,
                  data: result.values,
                }
              ]
            };
            const sum = result.values.reduce((a, b) => a + b, 0);
            this.total="Total number of kilometers: "+Math.round(sum * 100) / 100+"km";
            this.average="Average number of kilometers: "+Math.round((sum/keys.length)*100)/100+"km";
          }
        });
      }else{
      this._reportService.getUserKilometersPerDay(this.userId, formatDate(this.reportInfoForm.get('startDate')?.value,
        "yyyy-MM-dd", this._locale), formatDate(this.reportInfoForm.get('endDate')?.value, "yyyy-MM-dd",
        this._locale)).subscribe({
        next: (result) => {
          const keys: string[] = [];
          result.keys.forEach(function (value) {
            const date = String(value).split(',');
            keys.push(String(date[0]) + "-" + String(date[1]) + "-" + String(date[2]));
          });
          this.basicData = {
            labels: keys,
            datasets: [
              {
                label: 'Distance',
                backgroundColor: '#FAD02C',
                borderColor:'rgba(233,234,236,0.2)',
                tension: .4,
                data: result.values,
              }
            ]
          };
          const sum = result.values.reduce((a, b) => a + b, 0);
          this.total="Total number of kilometers: "+Math.round(sum * 100) / 100+"km";
          this.average="Average number of kilometers: "+Math.round((sum/keys.length)*100)/100+"km";
        }
      });
      }
    }
    else if(this.selected=="spendings"){
      this.diagramTitle="Spendings Per Day";
      if (this.role=="ADMIN"){
        this._reportService.getTotalSpendingsPerDay(formatDate(this.reportInfoForm.get('startDate')?.value,
          "yyyy-MM-dd", this._locale), formatDate(this.reportInfoForm.get('endDate')?.value, "yyyy-MM-dd",
          this._locale)).subscribe({
          next: (result) => {
            const keys: string[] = [];
            result.keys.forEach(function (value) {
              const date = String(value).split(',');
              keys.push(String(date[0]) + "-" + String(date[1]) + "-" + String(date[2]));
            });
            this.basicData = {
              labels: keys,
              datasets: [
                {
                  label: 'Spendings In Dollars',
                  backgroundColor: '#FAD02C',
                  borderColor: 'rgba(233,234,236,0.2)',
                  tension: .4,
                  data: result.values,
                }
              ]
            };
            const sum = result.values.reduce((a, b) => a + b, 0);
            this.total = "Total spendings: $" + Math.round(sum * 100) / 100;
            this.average = "Average spendings: $" + Math.round((sum / keys.length) * 100) / 100;
          }
        });
      }else {
        this._reportService.getUserSpendingsPerDay(this.userId, formatDate(this.reportInfoForm.get('startDate')?.value,
          "yyyy-MM-dd", this._locale), formatDate(this.reportInfoForm.get('endDate')?.value, "yyyy-MM-dd",
          this._locale)).subscribe({
          next: (result) => {
            const keys: string[] = [];
            result.keys.forEach(function (value) {
              const date = String(value).split(',');
              keys.push(String(date[0]) + "-" + String(date[1]) + "-" + String(date[2]));
            });
            this.basicData = {
              labels: keys,
              datasets: [
                {
                  label: 'Spendings In Dollars',
                  backgroundColor: '#FAD02C',
                  borderColor: 'rgba(233,234,236,0.2)',
                  tension: .4,
                  data: result.values,
                }
              ]
            };
            const sum = result.values.reduce((a, b) => a + b, 0);
            this.total = "Total spendings: $" + Math.round(sum * 100) / 100;
            this.average = "Average spendings: $" + Math.round((sum / keys.length) * 100) / 100;
          }
        });
      }
    }

  }
  onDateChange(): void{
    this.dateChange.emit();
    this.loadData();
  }
}
