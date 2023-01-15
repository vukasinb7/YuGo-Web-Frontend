import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {RideInfo} from "../../../../shared/models/RideInfo";
import {RideService} from "../../services/ride.service";

@Component({
  selector: 'app-searching-driver-screen',
  templateUrl: './searching-driver-screen.component.html',
  styleUrls: ['./searching-driver-screen.component.css']
})
export class SearchingDriverScreenComponent implements OnInit{
  @Input() rideFoundEvent?:Observable<RideInfo>;
  @Input() errorMessageEvent?:Observable<string>;
  text:string = "We are searching a driver for your ride, please wait."
  loading:boolean = true;
  constructor(private rideService:RideService) {
  }
  ngOnInit(){
    this.rideFoundEvent?.subscribe({
      next: ride => {
      if(ride.status == "SCHEDULED"){
          this.text = "The ride has been scheduled. You will get a confirmation notification, 30 minutes before ride."
          this.loading = false;
        }
      },
      error: err => {
        this.text = err.error;
        this.loading = false;
      }
    });
    this.rideService.rideSearchCompleted.subscribe(ride => {
      if(ride.status == "ACCEPTED"){
        console.log(ride);
        let date:Date = new Date(ride.startTime);
        this.text = "Driver is on his way.\nEstimated time of arrival: " + date.getHours() + ":" + date.getMinutes() + "h";
      }
      else if(ride.status == "REJECTED"){
        this.text = "We couldn't find available driver, please try again later."
      }
      this.loading = false;
    });
  }
}
