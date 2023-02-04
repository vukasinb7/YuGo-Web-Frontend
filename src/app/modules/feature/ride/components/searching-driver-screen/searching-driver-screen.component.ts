import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {RideInfo} from "../../../../shared/models/RideInfo";
import {PassengerRideNotificationsService} from "../../services/passenger-ride-notifications.service";
import {RideService} from "../../services/ride.service";

@Component({
  selector: 'app-searching-driver-screen',
  templateUrl: './searching-driver-screen.component.html',
  styleUrls: ['./searching-driver-screen.component.css']
})
export class SearchingDriverScreenComponent implements OnInit{
  @Input() rideFoundEvent?:Observable<RideInfo | undefined>;
  @Input() errorMessageEvent?:Observable<string>;
  @Output() goToFirstPageEvent:EventEmitter<void> = new EventEmitter<void>();
  text = "We are searching a driver for your ride, please wait."
  loading = true;
  enableReturnButton = false;
  enableCancelButton = false;
  ride?:RideInfo;
  constructor(private passengerRideService:PassengerRideNotificationsService, private rideService:RideService) {
  }

  cancelRide(){
    if(this.ride){
      this.rideService.cancelRide(this.ride.id).subscribe(() => {
        this.text = "Ride has been canceled";
        this.enableCancelButton = false;
        this.enableReturnButton = true;
      });
    }
  }
  returnToFirstPage(){
    this.goToFirstPageEvent.next();
  }

  ngOnInit(){
    this.rideFoundEvent?.subscribe({
      next: ride => {
        if(!ride){
          return;
        }
        if(ride.status == "SCHEDULED"){
            this.text = "The ride has been scheduled. You will get a confirmation notification, 30 minutes before ride.";
            this.ride = ride;
            this.enableCancelButton = true;
            this.loading = false;
          }
      },
      error: err => {
        this.text = err.error;
        this.loading = false;
      }
    });
    this.passengerRideService.rideAcceptedEvent.subscribe(ride => {
      const date:Date = new Date(ride.startTime);
      this.text = "Driver is on his way.\nEstimated time of arrival: " + date.getHours() + ":" + date.getMinutes() + "h";
      this.loading = false;
    });
    this.passengerRideService.rideRejectedEvent.subscribe(() => {
      this.text = "We couldn't find available driver, please try again later."
      this.enableReturnButton = true;
      this.loading = false;
    });
    this.passengerRideService.rideNotAvailableEvent.subscribe(()=> {
      this.text = "We couldn't find available driver, please try again later.";
      this.enableReturnButton = true;
      this.loading = false;
    });
  }
}
