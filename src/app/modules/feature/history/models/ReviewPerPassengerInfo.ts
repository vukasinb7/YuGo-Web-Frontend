import {ReviewInfoOut} from "./ReviewInfoOut";

export interface ReviewPerPassengerInfo{
  vehicleReview:ReviewInfoOut;
  driverReview:ReviewInfoOut;
}

export interface ReviewsPerRideInfo{
  rideReviews:ReviewPerPassengerInfo[];
}
