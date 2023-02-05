import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import { environment } from 'src/enviroments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Token} from "../models/Token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  onLogoutEvent:Subject<void> = new Subject<void>();
  user$ = new BehaviorSubject("");
  userState$ = this.user$.asObservable();

  constructor(private http: HttpClient) {
    this.user$.next(this.getRole());
  }

  logIn(auth: { password: string | null | undefined; email: string | null | undefined }): Observable<Token> {
    return this.http.post<Token>(environment.apiHost + 'user/login', auth, {
      headers: this.headers,
    });
  }

  logOut(): Observable<string> {
    this.onLogoutEvent.next();
    return this.http.get(environment.apiHost + 'user/logout', {
      responseType: 'text',
    });
  }

  getRole(): string {
    if (this.isLoggedIn()) {
      const accessToken = localStorage.getItem('token');
      const helper = new JwtHelperService();
      if(accessToken!=null)
        return helper.decodeToken(accessToken).role;
      else
        return "UNREGISTERED";
    }
    return "UNREGISTERED";
  }
  getEmail(): string{
    if(this.isLoggedIn()){
      const accessToken = localStorage.getItem('token');
      const helper = new JwtHelperService();
      if(accessToken!=null)
        return helper.decodeToken(accessToken).email;
      else
        return "";
    }
    return "";
  }
  getId(): number {
    if (this.isLoggedIn()) {
      const accessToken = localStorage.getItem('token');
      const helper = new JwtHelperService();
      if (accessToken!=null)
        return helper.decodeToken(accessToken).id;
      else
        return -1;
    }
    return -1;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') != null;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }

  refreshToken() : Observable<Token>{
      const refreshToken= localStorage.getItem('refreshToken');
      return this.http.post<Token>(environment.apiHost + 'user/refreshToken', {"refreshToken": refreshToken});
    }
}
