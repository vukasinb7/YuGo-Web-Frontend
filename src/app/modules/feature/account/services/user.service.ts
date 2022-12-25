import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../enviroments/environment";
import {AllUsersInfo} from "../models/AllUsersInfo";
import {AllRidesOut} from "../models/AllRidesOut";
import {UserInfo} from "../models/UserInfo";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers = new HttpHeaders({
  'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {

  }

  getPassengerInfo() : Observable<UserInfo>{
    return this.http.get<UserInfo>(environment.apiHost + "passenger/1");
  }

  getUsersInfo(page : number, size :number): Observable<AllUsersInfo>{
    return this.http.get<AllUsersInfo>(environment.apiHost + "user",
      {params : {
        page: page,
        size : size
      }});
  }

  blockUser(userId : number) : Observable<any>{
    return this.http.put(environment.apiHost + `user/${userId}/block`, {});
  }

  unblockUser(userId : number) : Observable<any>{
    return this.http.put(environment.apiHost + `user/${userId}/unblock`, {});
  }

  createNote(userId : number, note : string) : Observable<any>{
    return this.http.post(environment.apiHost + `user/${userId}/note`, {"message":note});
  }
  getPassengerRides(passengerId:number, page : number, size :number, sort: string, from: string, to:string): Observable<AllRidesOut>{
    return this.http.get<AllRidesOut>(environment.apiHost + `passenger/${passengerId}/ride`,
      {params : {
          page: page,
          size : size,
          sort :sort,
          from :from,
          to: to
        }});
  }
}
