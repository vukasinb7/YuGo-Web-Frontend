import {Component, Inject} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ReviewService} from "../../../../shared/services/review.service";
import {PassengerService} from "../../../../shared/services/passenger.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {RideInfo} from "../../../../shared/models/RideInfo";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";
import {ReviewOut} from "../history-review-card-driver/history-review-card-driver.component";
import {AuthService} from "../../../../core/services/auth.service";
import {ReviewInfoOut} from "../../models/ReviewInfoOut";

@Component({
  selector: 'app-history-review-card-passenger',
  templateUrl: './history-review-card-passenger.component.html',
  styleUrls: ['./history-review-card-passenger.component.css']
})
export class HistoryReviewCardPassengerComponent {

  dataSource= new MatTableDataSource<ReviewOut>();
  foundReview:boolean[]=[false,false];
  obs: Observable<any>;
  reviewList:ReviewInfoOut[]=[{rating:0, id:0} as ReviewInfoOut,{}as ReviewInfoOut];

  constructor(private reviewService: ReviewService, private passengerService: PassengerService, @Inject(MAT_DIALOG_DATA) public ride: RideInfo,private authService:AuthService) {
    this.obs = this.dataSource.connect();

  }



  getReviews(){
    this.reviewService.getReviewsForRide(this.ride.id).subscribe(
      {next:(reviews) => {
          reviews.forEach((reviewPerPassenger) =>{
            if (reviewPerPassenger.vehicleReview!=null){
              if(this.authService.getId()==reviewPerPassenger.vehicleReview.passenger.id){
                this.foundReview[0]=true;
                this.reviewList[0]=reviewPerPassenger.vehicleReview;
              }
            }
            if (reviewPerPassenger.driverReview!=null){
              if(this.authService.getId()==reviewPerPassenger.driverReview.passenger.id){
                this.foundReview[1]=true;
                this.reviewList[1]=reviewPerPassenger.driverReview;
              }
            }})

          //this.dataSource.data=this.reviewOut;

        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
          }}})
  }
}
