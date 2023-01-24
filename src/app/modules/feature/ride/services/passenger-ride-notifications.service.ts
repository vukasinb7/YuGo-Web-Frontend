import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {RideInfo} from "../../../shared/models/RideInfo";
import {Coordinates} from "../model/Coordinates";

@Injectable({
  providedIn: 'root'
})
export class PassengerRideNotificationsService {


  driverLocationUpdatedEvent:Subject<Coordinates> = new Subject<Coordinates>();
  passengerAddedToRideEvent:Subject<RideInfo> = new Subject<RideInfo>();
  vehicleArrivedEvent:Subject<void> = new Subject<void>();
  rideNotAvailableEvent:Subject<void> = new Subject();
  rideAcceptedEvent:Subject<RideInfo> = new Subject<RideInfo>();
  rideRejectedEvent:Subject<RideInfo> = new Subject<RideInfo>();
  startRideEvent:Subject<RideInfo> = new Subject<RideInfo>();
  endRideEvent:Subject<RideInfo> = new Subject<RideInfo>();



}
