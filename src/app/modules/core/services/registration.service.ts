import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserRegistration} from "../models/userRegistration";
import {Observable} from "rxjs";
import {environment} from "../../../../enviroments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient) { }

  register(user:UserRegistration):Observable<any>{
    return this.http.post(environment.apiHost + "passenger", user);
  }
}
