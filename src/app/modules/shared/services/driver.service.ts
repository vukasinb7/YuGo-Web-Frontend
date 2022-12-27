import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {UserInfo} from "../models/UserInfo";
import {environment} from "../../../../enviroments/environment";
import {HttpClient} from "@angular/common/http";
import {RidesPaged} from "../../feature/history/models/RidesPaged";

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  constructor(private http: HttpClient) {

  }

  getDriver(userId:number):Observable<UserInfo>{
    return this.http.get<UserInfo>(environment.apiHost + `driver/${userId}`);
  }
  getDriverRides(passengerId:number, page : number, size :number, sort: string, from: string, to:string): Observable<RidesPaged> {
    return this.http.get<RidesPaged>(environment.apiHost + `driver/${passengerId}/ride`,
      {
        params: {
          page: page,
          size: size,
          sort: sort,
          from: from,
          to: to
        }
      });
  }

}
