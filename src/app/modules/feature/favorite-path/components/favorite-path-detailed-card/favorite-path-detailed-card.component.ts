import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FavoritePathInfo} from "../../models/FavoritePathInfo";
import {FavoritePathService} from "../../../../shared/services/favorite.path.service";
import {Router} from "@angular/router";
import {FavoriteRouteLoadingService} from "../../../ride/services/favorite-route-loading.service";
import {PassengerService} from "../../../../shared/services/passenger.service";
import {ImageService} from "../../../../core/services/image.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-favorite-path-detailed-card',
  templateUrl: './favorite-path-detailed-card.component.html',
  styleUrls: ['./favorite-path-detailed-card.component.css']
})
export class FavoritePathDetailedCardComponent implements OnInit{
  public passengersProfilePics:Array<any>;
  constructor(@Inject(MAT_DIALOG_DATA) public path: FavoritePathInfo,private _sanitizer: DomSanitizer,private favoritePathService:FavoritePathService,private imageService:ImageService,private passengerService:PassengerService,private router: Router,private favoriteRouteLoadingService:FavoriteRouteLoadingService,private dialogRef:MatDialogRef<FavoritePathDetailedCardComponent>) {
    this.passengersProfilePics=[];
  }

  ngOnInit() {

    this.getPassengers();
  }

  dateToString(date:Date):string{
    const dateString=date.toString().split(",");
    return [dateString[2], dateString[1], dateString[0]].join(".")+". "+[dateString[3],dateString[4]].join(":");
  }
  padTo2Digits(num:number) {
    return num.toString().padStart(2, '0');
  }
  deletePath(){
    this.favoritePathService.deleteFavoritePath(this.path.id).subscribe({next:()=>{
        window.location.reload();
      }})

  }
  cleanUpLocation(location:string): string{
    if (location.includes(",")){
      const partialLocations=location.split(",");
      let result="";
      for (let i=0;i<partialLocations.length;i++){
        if (i<=2) {
          if (i === partialLocations.length - 1 || i===2)
            result = result + partialLocations[i];
          else
            result = result + partialLocations[i] + ", ";
        }
      }
      return result;
    }
    return location;
  }
  getPassengers(){
    for (let i = 0; i < this.path.passengers.length; i++) {
      this.passengerService.getPassenger(this.path.passengers[i].id).subscribe(
        {
          next: (passenger) => {
            this.imageService.getProfilePicture(passenger.profilePicture).then(resp => {
              const objectURL = URL.createObjectURL(resp);
              const dto={picture:this._sanitizer.bypassSecurityTrustUrl(objectURL),name:(passenger.name+" "+passenger.surname+"\n"+passenger.email+"\n"+passenger.telephoneNumber)};

              this.passengersProfilePics.push(dto);

            });
          }
        })
    }
  }

  createRide() {

    this.dialogRef.close();
    this.router.navigate(['home']).then(() => {
      this.favoriteRouteLoadingService.loadFavoriteRoute.next(this.path);
    });
  }
}
