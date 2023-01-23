import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../../enviroments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getUserRidesPerDay(userId:number,from:string,to:string):Observable<ReportOut>{
    return this.http.get<ReportOut>(environment.apiHost+`report/${userId}/ridesPerDay`,{
      params: {
        from: from,
        to: to
      }
    });
  }

  getTotalRidesPerDay(from:string,to:string):Observable<ReportOut>{
    return this.http.get<ReportOut>(environment.apiHost+`report/totalRidesPerDay`,{
      params: {
        from: from,
        to: to
      }
    });
  }

  getUserKilometersPerDay(userId:number,from:string,to:string):Observable<ReportOut>{
    return this.http.get<ReportOut>(environment.apiHost+`report/${userId}/kilometersPerDay`,{
      params: {
        from: from,
        to: to
      }
    });
  }

  getTotalKilometersPerDay(from:string,to:string):Observable<ReportOut>{
    return this.http.get<ReportOut>(environment.apiHost+`report/totalKilometersPerDay`,{
      params: {
        from: from,
        to: to
      }
    });
  }

  getUserSpendingsPerDay(userId:number,from:string,to:string):Observable<ReportOut>{
    return this.http.get<ReportOut>(environment.apiHost+`report/${userId}/totalCostPerDay`,{
      params: {
        from: from,
        to: to
      }
    });
  }
  getTotalSpendingsPerDay(from:string,to:string):Observable<ReportOut>{
    return this.http.get<ReportOut>(environment.apiHost+`report/totalCostPerDay`,{
      params: {
        from: from,
        to: to
      }
    });
  }
}
export interface ReportOut{
  keys:Date[];
  values:number[];
}
