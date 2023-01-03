import {Component, Input, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {DriverService} from "../../../../shared/services/driver.service";
import {PassengerService} from "../../../../shared/services/passenger.service";
import {FavoritePathService} from "../../../../shared/services/favorite.path.service";

@Component({
  selector: 'app-history-detailed-ride-card',
  templateUrl: './history-detailed-ride-card.component.html',
  styleUrls: ['./history-detailed-ride-card.component.css']
})
export class HistoryDetailedRideCardComponent implements OnInit{
  public icon = 'star_outlined';
  @Input() ride:any;
  driverName:String="";
  passengerName:String="";

  constructor(private driverService:DriverService, private passengerService: PassengerService, private favoritePathService:FavoritePathService) {
  }
  ngOnInit(){
    this.getDriver();
    this.getPassenger();
  }

  public changeIcon(){
    if (this.icon==='star'){
      this.icon = 'star_outlined' ;
    }
    else{
      this.icon='star';
      this.createFavoritePath();
    }
  }
  dateToString(date:Date):string{
    let dateString=date.toString().split(",");
    return [dateString[2], dateString[1], dateString[0]].join(".")+". "+[dateString[3],dateString[4]].join(":");
  }
  padTo2Digits(num:number) {
    return num.toString().padStart(2, '0');
  }

  getDriver(){
    this.driverService.getDriver(this.ride.driver.id).subscribe(
      {next:(driver) => {
          this.driverName= driver.name+" "+driver.surname;
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
          }}})
  }

  getPassenger(){
    this.passengerService.getPassenger(this.ride.passengers[0].id).subscribe(
      {next:(passenger) => {
          this.passengerName= passenger.name+" "+passenger.surname;
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
          }}})
  }

  createFavoritePath(){
    let favoritePath={
      "favoriteName":"HOMEHOME",
      "locations":this.ride.locations,
      "passengers":this.ride.passengers,
      "vehicleType":this.ride.vehicleType,
      "babyTransport":this.ride.babyTransport,
      "petTransport":this.ride.petTransport
    };
    this.favoritePathService.addFavoritePath(favoritePath).subscribe({next:(result)=>{}});

  }

}
