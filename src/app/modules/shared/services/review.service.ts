import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../enviroments/environment";
import {HttpClient} from "@angular/common/http";
import {ReviewPerPassengerInfo, ReviewsPerRideInfo} from "../../feature/history/models/ReviewPerPassengerInfo";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  getReviewsForRide(rideId:number): Observable<ReviewPerPassengerInfo[]> {
    return this.http.get<ReviewPerPassengerInfo[]>(environment.apiHost + `review/${rideId}`);
  }
}
