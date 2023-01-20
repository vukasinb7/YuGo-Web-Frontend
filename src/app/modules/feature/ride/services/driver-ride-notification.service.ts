import { Injectable } from '@angular/core';
import {Observable, Subject, takeUntil, timer} from "rxjs";
import {Coordinates} from "../model/Coordinates";
import {DriverService} from "../../../shared/services/driver.service";
import {AuthService} from "../../../core/services/auth.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DriverRideNotificationService {

  constructor(private driverService:DriverService, private authService:AuthService, private http:HttpClient) { }
  currentDriverLocation:Subject<Coordinates> = new Subject<Coordinates>();
  driverDestination:Subject<Coordinates> = new Subject<Coordinates>();
  routeFinishedEvent:Subject<void> = new Subject<void>();

  private async runSimulation(departure:Coordinates, destination:Coordinates){
    const headers = {'skip':'true'};
    let response:Observable<any> = this.http.get(`https://routing.openstreetmap.de/routed-car/route/v1/driving/${departure.longitude},${departure.latitude};${destination.longitude},${destination.latitude}?geometries=geojson&overview=false&alternatives=true&steps=true`, {'headers':headers});
    response.subscribe(value => {
      let coordinates:any[] = [];
      for(let step of value.routes[0].legs[0].steps){
        coordinates = [...coordinates, ...step.geometry.coordinates]
      }
      let simulationEndEvent:Subject<void> = new Subject();
      timer(0,1000).pipe(takeUntil(simulationEndEvent)).subscribe(_ => {
        let newCoordsArr = coordinates.shift();
        if(!newCoordsArr){
          simulationEndEvent.next();
          return;
        }
        let coords:Coordinates = {
          latitude:newCoordsArr[1],
          longitude:newCoordsArr[0]
        }
        this.currentDriverLocation.next(coords);
      });

    });
  }

  startRideSimulation(destination:Coordinates){
    this.driverDestination.next(destination);
    this.driverService.getLocation(this.authService.getId()).subscribe(currentLocation => {
      this.runSimulation(currentLocation, destination).then(() => {
        this.routeFinishedEvent.next();
      });
    });

  }
}
