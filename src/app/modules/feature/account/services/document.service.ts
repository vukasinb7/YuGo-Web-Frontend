import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../enviroments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  constructor(private http: HttpClient) {
  }

  getDriverDocuments(driverId : number) : Observable<Document[]>{
    return this.http.get<Document[]>(environment.apiHost + `driver/${driverId}/documents`);
  }
}
