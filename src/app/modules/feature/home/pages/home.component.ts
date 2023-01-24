import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {PassengerRideNotificationsService} from "../../ride/services/passenger-ride-notifications.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private authService:AuthService, private passengerRideService:PassengerRideNotificationsService){
  }

  hasActiveRide:boolean = false;
  role?:String;

  ngOnInit(): void {
    this.authService.userState$.subscribe(value => {
      this.role = value;
    });
    this.passengerRideService.startRideEvent.subscribe(() => {
      this.hasActiveRide = true;
    });
    this.passengerRideService.endRideEvent.subscribe(() => {
      this.hasActiveRide = false;
    });
  }


}
