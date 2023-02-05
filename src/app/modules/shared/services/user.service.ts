import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../enviroments/environment";
import {UsersInfoPaged} from "../../feature/account/models/UsersInfoPaged";
import {UserInfo} from "../models/UserInfo";
import {AllNotes} from "../models/AllNotes";
import {Note} from "../../feature/account/models/Note";
import {MessageSimplifiedInfo} from "../models/MessageSimplifiedInfo";
import {PasswordFormInfo} from "../models/PasswordFormInfo";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(userId : number, role: string) : Observable<UserInfo>{
    role = role.toLowerCase();
    return this.http.get<UserInfo>(environment.apiHost + `${role}/${userId}`);
  }

  getUserById(userId : number) : Observable<UserInfo>{
    return this.http.get<UserInfo>(environment.apiHost + `user/${userId}`);
  }

  resetPasswordWithCode(code:number,password:string):Observable<string>{
    return  this.http.put<string>(environment.apiHost+`user/resetPassword`,{"code":code,"newPassword":password})
  }

  sendPasswordCodeEfficient(email:string):Observable<string>{
    return this.http.post<string>(environment.apiHost+`user/${email}/resetPassword`,{})
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

  changePassword(userId :number, passwordForm: PasswordFormInfo): Observable<string>{
    return this.http.put<string>(environment.apiHost + `user/${userId}/changePassword`,passwordForm)
  }

  blockUser(userId : number) : Observable<MessageSimplifiedInfo>{
    return this.http.put<MessageSimplifiedInfo>(environment.apiHost + `user/${userId}/block`, {});
  }

  unblockUser(userId : number) : Observable<MessageSimplifiedInfo>{
    return this.http.put<MessageSimplifiedInfo>(environment.apiHost + `user/${userId}/unblock`, {});
  }

  createNote(userId : number, note : string) : Observable<Note>{
    return this.http.post<Note>(environment.apiHost + `user/${userId}/note`, {"message":note});
  }

  getNotes(userId : number, page : number, size :number) : Observable<AllNotes>{
    return this.http.get<AllNotes>(environment.apiHost + `user/${userId}/note`,
      {params : {
          page: page,
          size : size
        }});
  }
}
