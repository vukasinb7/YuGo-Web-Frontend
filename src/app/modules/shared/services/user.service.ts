import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../enviroments/environment";
import {UsersInfoPaged} from "../../feature/account/models/UsersInfoPaged";
import {RidesPaged} from "../../feature/history/models/RidesPaged";
import {UserInfo} from "../models/UserInfo";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ReviewsPerRideInfo} from "../../feature/history/models/ReviewPerPassengerInfo";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(userId : number, role: string) : Observable<UserInfo>{
    role = role.toLowerCase();
    return this.http.get<UserInfo>(environment.apiHost + `${role}/${userId}`);
  }

  updateUser(userId : number, role: string, values: any) : Observable<UserInfo>{
    role = role.toLowerCase();
    return this.http.put<UserInfo>(environment.apiHost + `${role}/${userId}`, values);
  }

  getUsers(page : number, size :number): Observable<UsersInfoPaged>{
    return this.http.get<UsersInfoPaged>(environment.apiHost + "user",
      {params : {
        page: page,
        size : size
      }});
  }

  changePassword(userId :number, passwordForm: any){
    return this.http.put(environment.apiHost + `user/${userId}/changePassword`,passwordForm)
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

  getNotes(userId : number, page : number, size :number) : Observable<any>{
    return this.http.get(environment.apiHost + `user/${userId}/note`,
      {params : {
          page: page,
          size : size
        }});
  }
}
