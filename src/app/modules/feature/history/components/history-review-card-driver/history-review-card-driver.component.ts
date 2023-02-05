import { Component, Inject, OnInit} from '@angular/core';
import {ReviewService} from "../../../../shared/services/review.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {RideInfo} from "../../../../shared/models/RideInfo";
import {ReviewPerPassengerInfo} from "../../models/ReviewPerPassengerInfo";
import {ReviewInfoOut} from "../../models/ReviewInfoOut";
import {PassengerService} from "../../../../shared/services/passenger.service";
import {MatTableDataSource} from "@angular/material/table";
import {BehaviorSubject} from "rxjs";
import {RideDataInfo} from "../history-review-card-passenger/history-review-card-passenger.component";

@Component({
  selector: 'app-history-review-card-driver',
  templateUrl: './history-review-card-driver.component.html',
  styleUrls: ['./history-review-card-driver.component.css']
})
export class HistoryReviewCardDriverComponent implements OnInit{

  reviewList:ReviewInfoOut[]=[];
  reviewOut:ReviewOut[]=[];
  rideReviewList:ReviewPerPassengerInfo[]=[];
  dataSource= new MatTableDataSource<ReviewOut>();
  obs:  BehaviorSubject<ReviewOut[]>;
  showReviewError=false;
  passengerName="";
  public ride : RideInfo;
  constructor(private reviewService: ReviewService, private passengerService: PassengerService, @Inject(MAT_DIALOG_DATA) public data: RideDataInfo) {
    this.ride = data.ride;
    this.obs = this.dataSource.connect();
  }
  ngOnInit(){
    this.getReviews();
  }

  getReviews(){
    this.reviewService.getReviewsForRide(this.ride.id).subscribe(
      {next:(reviews) => {
          if (reviews.length!=0) {
            reviews.forEach((reviewPerPassenger) => {
              if (reviewPerPassenger.vehicleReview != null) {
                reviewPerPassenger.vehicleReview.type = "VEHICLE";
                this.reviewList.push(reviewPerPassenger.vehicleReview)
              }
              if (reviewPerPassenger.driverReview != null) {
                reviewPerPassenger.driverReview.type = "DRIVER";
                this.reviewList.push(reviewPerPassenger.driverReview)
              }
            })
            this.reviewList.forEach((item) => {
              let passengerCred = "";
              this.passengerService.getPassenger(item.passenger.id).subscribe(
                {
                  next: (passenger) => {
                    passengerCred = passenger.name + " " + passenger.surname;
                    this.reviewOut.push({
                      reviewInfoOut: item,
                      passengerName: passengerCred,
                      typeOfReview: this.getTypeString(item.type)
                    })
                  }
                })

            })

          }
          else {
            this.showReviewError=true;
          }
          this.dataSource.data = this.reviewOut;
        }})
  }

  getTypeString(typeOfReview:string):string{
    if (typeOfReview=="VEHICLE")
      return "Vehicle Review";
    else
      return "Ride Review";
  }

}

export interface ReviewOut{
  reviewInfoOut:ReviewInfoOut;
  passengerName:string;
  typeOfReview:string
}
