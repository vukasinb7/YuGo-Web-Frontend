import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {interval, Observable} from "rxjs";

@Component({
  selector: 'app-ride-pick-time',
  templateUrl: './ride-pick-time.component.html',
  styleUrls: ['./ride-pick-time.component.css']
})

export class RidePickTimeComponent implements OnInit{
  @Output() changeFormPageEmitter = new EventEmitter<number>();
  selectedTime?:string;
  currentDateTime:Date;
  minTime:Date;
  selectedDate?:Date;
  timeChangedEvent?:Observable<any>;
  constructor() {
    this.currentDateTime = new Date();
    this.minTime = this.currentDateTime;
    this.selectedTime = this.dateToString(this.currentDateTime);
    this.selectedDate = this.currentDateTime;
  }

  nextFormPage():void{
    this.changeFormPageEmitter.emit(1);
  }
  previousFormPage():void{
    this.changeFormPageEmitter.emit(-1);
  }

  ngOnInit(): void {
    this.timeChangedEvent?.subscribe((val:any)=>{
      console.log(val);
    });
    interval(2000).subscribe(()=>{
      this.currentDateTime = new Date();
      this.checkMinTime();
    });
  }
  dateToString(date:Date):string{
    return date.getHours() + ":" + date.getMinutes();
  }
  selectedDateChanged(event:any){
    this.selectedDate = event;
    this.checkMinTime();
  }
  checkMinTime(){
    if(this.selectedDate){
      let dummy:Date = new Date(this.selectedDate);
      dummy.setHours(0,0,0,0);
      if(dummy > this.currentDateTime){
        this.minTime.setHours(0,0,0,0);
      }else{
        this.minTime = this.currentDateTime;
        if(this.selectedTime){
          if(this.selectedTime < this.currentDateTime.getHours()+":"+this.currentDateTime.getMinutes()){
            this.selectedTime = this.dateToString(this.currentDateTime);
          }
        }
      }
    }
  }
}
