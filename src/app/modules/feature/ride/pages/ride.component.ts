import { Component } from '@angular/core';
import {RideProperties} from "../model/RideProperties";
import {LocationInfo} from "../../../shared/models/LocationInfo";
import {RideService} from "../services/ride.service";
import {RideBooking} from "../model/RideBooking";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent {
  formPageIndex: number = 0;

  rideDateTime?:Date;
  rideProperties?:RideProperties;
  fromAddress?:LocationInfo;
  toAddress?:LocationInfo;

  constructor(private rideService:RideService, private authService:AuthService) {
  }

  switchFormPage(switchDirection:number){
    this.formPageIndex += switchDirection;
  }
  routeChanged(route:[LocationInfo, LocationInfo]){
    [this.fromAddress, this.toAddress] = route;
  }

  bookRide(){
    let ride:RideBooking = {
      locations:[{departure:this.fromAddress!, destination:this.toAddress!}],
      passengers:[{id:this.authService.getId(), email:""}],
      vehicleType:this.rideProperties!.vehicleTypeName,
      babyTransport:this.rideProperties!.includeBabies,
      petTransport:this.rideProperties!.includePets
    };
    console.log(ride);
    this.rideService.createRide(ride).then(resp => {
      console.log(resp);
    });
  }
}
