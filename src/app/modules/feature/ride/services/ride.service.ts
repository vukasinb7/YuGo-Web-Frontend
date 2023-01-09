import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RideBooking} from "../model/RideBooking";
import {RideInfo} from "../../../shared/models/RideInfo";
import * as http from "http";
import {environment} from "../../../../../enviroments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RideService {

  constructor(private http:HttpClient) { }
  createRide(ride:RideBooking):Observable<RideInfo>{
    return this.http.post<RideInfo>(environment.apiHost + 'ride', ride);
  }
}
