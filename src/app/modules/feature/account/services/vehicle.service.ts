import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../enviroments/environment";
import {Vehicle} from "../../../shared/models/Vehicle";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private http: HttpClient) {
  }

  getVehicle(userId : number) : Observable<Vehicle>{
    return this.http.get<Vehicle>(environment.apiHost + `driver/${userId}/vehicle`);
  }

  makeVehicleChangeRequest(userId : number, vehicle : any) : Observable<any>{
    return this.http.post<any>(environment.apiHost + `vehicle/${userId}/changeVehicle`, vehicle)
  }
}
