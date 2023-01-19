import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Coordinates} from "../model/Coordinates";
import {DriverService} from "../../../shared/services/driver.service";
import {RideInfo} from "../../../shared/models/RideInfo";

@Injectable({
  providedIn: 'root'
})
export class DriverRideNotificationService {

  constructor(private driverService:DriverService) { }
  currentDriverLocation:Subject<Coordinates> = new Subject<Coordinates>();
  driverDestination:Subject<Coordinates> = new Subject<Coordinates>();

  startRideSimulation(destination:Coordinates){
    this.driverDestination.next(destination);
    //TODO simulacija kretanja
  }
}
