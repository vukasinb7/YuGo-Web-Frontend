import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {UserInfo} from "../models/UserInfo";
import {environment} from "../../../../enviroments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  constructor(private http: HttpClient) {

  }

  getDriver(userId:number):Observable<UserInfo>{
    return this.http.get<UserInfo>(environment.apiHost + `driver/${userId}`);
  }

}
