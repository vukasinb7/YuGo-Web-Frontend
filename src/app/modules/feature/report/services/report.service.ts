import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {DocumentInfo} from "../../../shared/models/DocumentInfo";
import {environment} from "../../../../../enviroments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getUserRidesPerDay(userId:number,from:string,to:string):Observable<Map<Date,number>>{
    return this.http.get<Map<Date,number>>(environment.apiHost+`report/${userId}/ridesPerDay`,{
      params: {
        from: from,
        to: to
      }
    });
  }
}
