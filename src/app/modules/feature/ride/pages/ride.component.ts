import {Component, OnInit} from '@angular/core';
import {RideProperties} from "../model/RideProperties";
import {LocationInfo} from "../../../shared/models/LocationInfo";
import {RideService} from "../services/ride.service";
import {RideBooking} from "../model/RideBooking";
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";
import {BehaviorSubject, ReplaySubject, Subject} from "rxjs";
import {RideInfo} from "../../../shared/models/RideInfo";
import {UserSimpleInfo} from "../../../shared/models/UserSimpleInfo";
import {PassengerRideNotificationsService} from "../services/passenger-ride-notifications.service";
import {DestinationPickerService} from "../services/destination-picker.service";
import {FavoriteRouteLoadingService} from "../services/favorite-route-loading.service";
import {VehicleTypeService} from "../services/vehicle-type.service";
import {VehicleType, VehicleTypeCardData} from "../components/vehicle-type-card/vehicle-type-card.component";
import {ImageService} from "../../../core/services/image.service";
import {FavoritePathInputComponent} from "../../history/components/favorite-path-input/favorite-path-input.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit{
  formPageIndex = 0;

  isDataReady = false;

  rideDateTime?:Date;
  rideProperties?:RideProperties;
  fromAddress?:LocationInfo;
  toAddress?:LocationInfo;
  passengers?:UserSimpleInfo[];

  searchingDriver = false;

  errorMessageEvent:Subject<string> = new Subject<string>();
  rideFoundEvent:BehaviorSubject<RideInfo | undefined> = new BehaviorSubject<RideInfo | undefined>(undefined);

  //----------------------
  routeChangedEvent:ReplaySubject<{fromAddress:LocationInfo, toAddress:LocationInfo}> = new ReplaySubject(1);
  ridePropertiesChangedEvent:ReplaySubject<RideProperties> = new ReplaySubject<RideProperties>(1);
  passengersChangedEvent:ReplaySubject<UserSimpleInfo[]> = new ReplaySubject<UserSimpleInfo[]>(1);

  //----------------------


  constructor(private rideService:RideService,public dialog: MatDialog,private imageService:ImageService, private vehicleTypeService:VehicleTypeService, private favoriteRouteService:FavoriteRouteLoadingService, private authService:AuthService, private router: Router, private passengerRideService:PassengerRideNotificationsService,private destinationService:DestinationPickerService) {
  }

  returnToFirstPage(){
    this.formPageIndex = 0;
    this.destinationService.updateFromAddress(undefined);
    this.destinationService.updateToAddress(undefined);
  }

  switchFormPage(switchDirection:number){
    if(this.formPageIndex + switchDirection > 3){
      this.formPageIndex += switchDirection;
      this.searchingDriver = true;
      this.bookRide().then(() => {
        //this.formPageIndex = 0;
      });
    }
    else if(this.formPageIndex + switchDirection >= 2 && this.authService.getRole() == "UNREGISTERED"){
      this.router.navigate(['home'], {queryParams:{loginDialog:true}})
    }else{
      this.formPageIndex += switchDirection;
    }
  }

  async bookRide(){
    if(this.passengers!=null && this.rideProperties!=null && this.rideDateTime!=null && this.fromAddress!=null && this.toAddress!=null) {
      const ride: RideBooking = {
        locations: [{departure: this.fromAddress, destination: this.toAddress}],
        passengers: this.passengers,
        vehicleType: this.rideProperties.vehicleTypeInfo.vehicleTypeName,
        babyTransport: this.rideProperties.includeBabies,
        petTransport: this.rideProperties.includePets,
        scheduledTime: (new Date(this.rideDateTime.getTime() - this.rideDateTime.getTimezoneOffset() * 60000)).toISOString()
      };

      this.rideService.createRide(ride).subscribe({
        next: response => {
          this.rideFoundEvent.next(response);
        },
        error: err => {
          this.rideFoundEvent.error(err);
        }
      });
    }


  }

  ngOnInit(): void {
    this.passengersChangedEvent.subscribe(passengers => {
      this.passengers = passengers;
    })
    this.ridePropertiesChangedEvent.subscribe(properties => {
      this.rideProperties = properties;
    });
    this.routeChangedEvent.subscribe(route => {
      this.fromAddress = route.fromAddress;
      this.toAddress = route.toAddress;
    });
    this.favoriteRouteService.loadFavoriteRoute.subscribe(favoriteRoute => {
      this.passengersChangedEvent.next(favoriteRoute.passengers);
      this.vehicleTypeService.getVehicleTypes().then(result => {
        let vehicleType:VehicleType | undefined;
        for(const vType of result){
          if(vType.vehicleType == favoriteRoute.vehicleType){
            vehicleType = vType;
            break;
          }
        }
        if (vehicleType!=null) {
          this.imageService.getImage(vehicleType.imgPath).then(resp => {
            if (vehicleType!=null) {
              const vehicleTypeCardData: VehicleTypeCardData = {
                id: vehicleType.id,
                image: resp,
                pricePerKm: vehicleType.pricePerKm,
                vehicleTypeName: vehicleType.vehicleType
              }
              const rideProperties: RideProperties = {
                vehicleTypeInfo: vehicleTypeCardData,
                includePets: favoriteRoute.petTransport,
                includeBabies: favoriteRoute.babyTransport
              }
              this.ridePropertiesChangedEvent.next(rideProperties);
            }
          });
        }
      });
      const path=favoriteRoute.locations.at(0);
      if (path!=null)
        this.routeChangedEvent.next({fromAddress: path.departure, toAddress:path.destination});
      });
    this.authService.onLogoutEvent.subscribe(() => {
      this.returnToFirstPage();
    });
    this.authService.userState$.subscribe(role => {
      if(role != "PASSENGER"){
        return;
      }
      this.passengerRideService.passengerAddedToRideEvent.subscribe((ride: RideInfo | undefined) => {
        this.formPageIndex = 4;
        this.searchingDriver = true;
        this.rideFoundEvent.next(ride);
        this.isDataReady = true;
      });
      const userID:number = this.authService.getId();
      if(userID == -1){
        return;
      }
      this.rideService.getUnresolvedRide(userID).subscribe({
        next: (ride) => {
          this.formPageIndex = 4;
          this.searchingDriver = true;
          this.rideFoundEvent.next(ride);
          this.isDataReady = true;
        },
        error: () => {
          this.formPageIndex = 0;
          this.isDataReady = true;
        }
      });

    });

  }

  addToFavorite() {
    if (this.passengers!=null && this.fromAddress!=null && this.toAddress!=null && this.rideProperties!=null) {
      const ride = {
        name: "",
        id: "",
        locations: [{departure: this.fromAddress, destination: this.toAddress}],
        passengers: this.passengers,
        vehicleType: this.rideProperties.vehicleTypeInfo.vehicleTypeName,
        babyTransport: this.rideProperties.includeBabies,
        petTransport: this.rideProperties.includePets,
      };
      this.dialog.open(FavoritePathInputComponent, {
        data: ride,
        width: '30%',
        backdropClass: 'backdropBackground'
      });
    }
  }
}
