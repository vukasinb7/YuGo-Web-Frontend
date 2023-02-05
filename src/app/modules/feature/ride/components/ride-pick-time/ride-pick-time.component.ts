import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-ride-pick-time',
  templateUrl: './ride-pick-time.component.html',
  styleUrls: ['./ride-pick-time.component.css']
})

export class RidePickTimeComponent{
  @Output() changeFormPageEmitter = new EventEmitter<number>();
  @Output() rideDateTimeChangedEvent = new EventEmitter<Date>();
  @Output() callFavorite = new EventEmitter<void>();
  selectedTime?:string;
  currentDateTime:Date;
  minTime:Date;
  selectedDate?:Date;
  constructor() {
    this.currentDateTime = new Date();
    this.minTime = this.currentDateTime;
    this.selectedTime = this.dateToString(this.currentDateTime);
    this.selectedDate = this.currentDateTime;
  }
  private getSelectedDateTime():Date{
    if (this.selectedDate!=null && this.selectedTime!=null) {
      const tokens: string[] = this.selectedTime.split(':');
      const hours = Number(tokens[0]);
      const minutes = Number(tokens[1]);
      const output: Date = new Date(this.selectedDate);
      output.setHours(hours);
      output.setMinutes(minutes);
      return output;
    }
    return new Date();
  }

  nextFormPage():void{
    this.rideDateTimeChangedEvent.emit(this.getSelectedDateTime());
    this.changeFormPageEmitter.emit(1);
  }
  previousFormPage():void{
    this.changeFormPageEmitter.emit(-1);
  }

  clickFavorite():void{
    this.callFavorite.emit();
  }

  dateToString(date:Date):string{
    return date.getHours() + ":" + date.getMinutes();
  }
  selectedDateChanged(event:Date){
    this.selectedDate = event;
    this.checkMinTime();
  }
  selectedTimeChanged(event:string){
    this.selectedTime = event;
  }
  checkMinTime(){
    if(this.selectedDate){
      const dummy:Date = new Date(this.selectedDate);
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
