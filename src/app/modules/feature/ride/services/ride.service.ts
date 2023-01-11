import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RideBooking} from "../model/RideBooking";
import {RideInfo} from "../../../shared/models/RideInfo";
import * as http from "http";
import {environment} from "../../../../../enviroments/environment";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RideService {

  constructor(private http:HttpClient) { }
  rideSearchCompleted:Subject<RideInfo> = new Subject<RideInfo>();
  createRide(ride:RideBooking):Observable<RideInfo>{
    return this.http.post<RideInfo>(environment.apiHost + 'ride', ride);
  }
  getRide(rideID:number):Observable<RideInfo>{
    return this.http.get<RideInfo>(environment.apiHost + "ride/" + rideID);
  }
  acceptRide(rideID:number):Observable<RideInfo>{
    console.log("----------------------- ACCEPTED RIDE -----------------------")
    console.log("ride/"+ rideID+"/accept");
    return this.http.put<RideInfo>(environment.apiHost + "ride/"+ rideID+"/accept", {});
  }
  rejectRide(rideID:number, rejectionReason:string):Observable<RideInfo>{
    return this.http.put<RideInfo>(environment.apiHost + "ride/" + rideID + "/cancel", {reason:rejectionReason});
  }

}
