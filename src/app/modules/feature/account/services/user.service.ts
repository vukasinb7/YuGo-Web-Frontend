import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../enviroments/environment";
import {AllUsersInfo} from "../models/AllUsersInfo";
import {UserInfo} from "../models/UserInfo";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {

  }

  getUser(userId : number, role : string) : Observable<UserInfo>{
    role = role.toLowerCase();
    return this.http.get<UserInfo>(environment.apiHost + `${role}/${userId}`);
  }

  updateUser(values: any) : Observable<UserInfo>{
    const accessToken: any = localStorage.getItem('user');
    const helper = new JwtHelperService();
    const userId = helper.decodeToken(accessToken).id;
    const role = helper.decodeToken(accessToken).role;
    if (role == "PASSENGER"){
      return this.http.put<UserInfo>(environment.apiHost + `passenger/${userId}`, values);
    }
    return this.http.put<UserInfo>(environment.apiHost + `driver/${userId}`, values);
  }

  getUsers(page : number, size :number): Observable<AllUsersInfo>{
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

  getNotes(userId : number, page : number, size :number) : Observable<any>{
    return this.http.get(environment.apiHost + `user/${userId}/note`,
      {params : {
          page: page,
          size : size
        }});
  }
}
