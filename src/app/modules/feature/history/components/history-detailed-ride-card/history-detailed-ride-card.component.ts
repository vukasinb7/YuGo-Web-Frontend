import {Component, Input} from '@angular/core';
import {RideInfo} from "../../../account/models/RideInfo";

@Component({
  selector: 'app-history-detailed-ride-card',
  templateUrl: './history-detailed-ride-card.component.html',
  styleUrls: ['./history-detailed-ride-card.component.css']
})
export class HistoryDetailedRideCardComponent {
  public icon = 'star_outlined';
  @Input() ride:any;

  public changeIcon(){
    if (this.icon==='star'){
      this.icon = 'star_outlined' ;
    }
    else{
      this.icon='star';
    }
  }
  dateToString(date:Date):string{
    let dateString=date.toString().split(",");
    return dateString[2] + "." + dateString[1] + "." + dateString[0]+". "+dateString[3]+":"+dateString[4];
  }
  padTo2Digits(num:number) {
    return num.toString().padStart(2, '0');
  }

}
