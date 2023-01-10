import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserRegistration} from "../models/UserRegistration";
import {Observable} from "rxjs";
import {environment} from "../../../../enviroments/environment";
import {UserInfo} from "../../shared/models/UserInfo";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient) { }

  registerPassenger(user:UserRegistration):Observable<UserInfo>{
    return this.http.post<UserInfo>(environment.apiHost + "passenger", user);
  }

  registerDriver(user:UserRegistration):Observable<UserInfo>{
    return this.http.post<UserInfo>(environment.apiHost + "driver", user);
  }
}
