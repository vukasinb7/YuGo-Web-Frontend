import { Injectable } from '@angular/core';
import {RideInfo} from "../../../shared/models/RideInfo";
import {Coordinates} from "../model/Coordinates";
import {ReplaySubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PassengerRideNotificationsService {


  driverLocationUpdatedEvent:ReplaySubject<Coordinates> = new ReplaySubject<Coordinates>(1);
  passengerAddedToRideEvent:Subject<RideInfo> = new Subject<RideInfo>();
  vehicleArrivedEvent:Subject<void> = new Subject<void>();
  rideNotAvailableEvent:Subject<void> = new Subject();
  rideAcceptedEvent:ReplaySubject<RideInfo> = new ReplaySubject<RideInfo>(1);
  rideRejectedEvent:Subject<RideInfo> = new Subject<RideInfo>();
  startRideEvent:ReplaySubject<RideInfo> = new ReplaySubject<RideInfo>(1);
  endRideEvent:Subject<RideInfo> = new Subject<RideInfo>();



}
