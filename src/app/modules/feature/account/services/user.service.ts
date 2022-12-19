import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInfo} from "../components/account-info/account-info.component";
import {Observable} from "rxjs";
import {environment} from "../../../../../enviroments/environment";
import {AllUsersInfo} from "../components/users-table/users-table.component";

@Injectable({
  providedIn: 'root'
})
export class UserService {
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
}
