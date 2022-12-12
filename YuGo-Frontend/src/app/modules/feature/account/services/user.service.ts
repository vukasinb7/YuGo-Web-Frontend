import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInfo} from "../components/account-info/account-info.component";
import {Observable} from "rxjs";
import {environment} from "../../../../../enviroments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {

  }

  getPassengerInfo() : Observable<UserInfo>{
    return this.http.get<UserInfo>(environment.apiHost + "api/passenger/1");
  }
}
