import {Component, Input, OnInit} from '@angular/core';
import {RideProperties} from "../model/RideProperties";
import {LocationInfo} from "../../../shared/models/LocationInfo";
import {RideService} from "../services/ride.service";
import {RideBooking} from "../model/RideBooking";
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";
import {BehaviorSubject, Subject} from "rxjs";
import {RideInfo} from "../../../shared/models/RideInfo";
import {UserSimpleInfo} from "../../../shared/models/UserSimpleInfo";
import {PassengerRideNotificationsService} from "../services/passenger-ride-notifications.service";

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit{
  formPageIndex: number = 0;

  isDataReady:boolean = false;

  rideDateTime?:Date;
  rideProperties?:RideProperties;
  fromAddress?:LocationInfo;
  toAddress?:LocationInfo;
  passengers?:UserSimpleInfo[];

 searchingDriver:boolean = false;

  errorMessageEvent:Subject<string> = new Subject<string>();
  rideFoundEvent:BehaviorSubject<RideInfo | undefined> = new BehaviorSubject<RideInfo | undefined>(undefined);

  constructor(private rideService:RideService, private authService:AuthService, private router: Router, private passengerRideService:PassengerRideNotificationsService) {
  }

  switchFormPage(switchDirection:number){
    if(this.formPageIndex + switchDirection > 3){
      this.formPageIndex += switchDirection;
      this.searchingDriver = true;
      this.bookRide().then(() => {
        //this.formPageIndex = 0;
      });
    }
    else if(this.formPageIndex + switchDirection >= 2 && this.authService.getRole() == "UNREGISTERED"){
      this.router.navigate(['home'], {queryParams:{loginDialog:true}})
    }else{
      this.formPageIndex += switchDirection;
    }
  }
  routeChanged(route:[LocationInfo, LocationInfo]){
    [this.fromAddress, this.toAddress] = route;
  }

  async bookRide(){
    let ride:RideBooking = {
      locations:[{departure:this.fromAddress!, destination:this.toAddress!}],
      passengers:this.passengers!,
      vehicleType:this.rideProperties!.vehicleTypeName,
      babyTransport:this.rideProperties!.includeBabies,
      petTransport:this.rideProperties!.includePets,
      scheduledTime: (new Date(this.rideDateTime!.getTime() - this.rideDateTime!.getTimezoneOffset() * 60000)).toISOString()
    };

    this.rideService.createRide(ride).subscribe({
      next: response => {
        console.log(response);
        this.rideFoundEvent.next(response);
      },
      error: err => {
        console.log(err);
        this.rideFoundEvent.error(err);
      }
    });


  }

  ngOnInit(): void {
    this.authService.userState$.subscribe(role => {
      if(role != "PASSENGER"){
        return;
      }
      this.passengerRideService.passengerAddedToRideEvent.subscribe(ride => {
        this.formPageIndex = 4;
        this.searchingDriver = true;
        this.rideFoundEvent.next(ride);
        this.isDataReady = true;
      });
      let userID:number = this.authService.getId();
      if(userID == -1){
        return;
      }
      this.rideService.getUnresolvedRide(userID).subscribe({
        next: (ride) => {
          this.formPageIndex = 4;
          this.searchingDriver = true;
          this.rideFoundEvent.next(ride);
          this.isDataReady = true;
        },
        error: err => {
          this.formPageIndex = 0;
          this.isDataReady = true;
        }
      });

    });

  }
}
