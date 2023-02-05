import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {FavoritePathInfo} from "../../models/FavoritePathInfo";
import {FavoritePathService} from "../../../../shared/services/favorite.path.service";
import {MatDialog} from "@angular/material/dialog";
import {FavoritePathDetailedCardComponent} from "../favorite-path-detailed-card/favorite-path-detailed-card.component";
import {Router} from "@angular/router";
import {FavoriteRouteLoadingService} from "../../../ride/services/favorite-route-loading.service";

@Component({
  selector: 'app-favorite-path-card',
  templateUrl: './favorite-path-card.component.html',
  styleUrls: ['./favorite-path-card.component.css']
})
export class FavoritePathCardComponent implements OnInit{

  obs: BehaviorSubject<FavoritePathInfo[]>;
  dataSource= new MatTableDataSource<FavoritePathInfo>();
  constructor(private favoritePathService:FavoritePathService, public dialog: MatDialog,private router: Router,private favoriteRouteLoadingService:FavoriteRouteLoadingService) {
    this.obs = this.dataSource.connect();
  }
  ngOnInit() {
    this.loadData();
  }
  loadData(){
    this.favoritePathService.getFavoritePaths().subscribe({next:(paths)=>{
      this.dataSource.data=paths;
      }})
    document.getElementsByClassName("delete-btn")
  }
  viewDetails(path: FavoritePathInfo) {
    this.dialog.open(FavoritePathDetailedCardComponent,{
      data:path,
      width: '25%',
      backdropClass: 'backdropBackground',
    })

  }
  deletePath(id:number,event:Event){
    event.stopPropagation();
    this.favoritePathService.deleteFavoritePath(id).subscribe({next:()=>{
      this.loadData();
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
  createRide(path:FavoritePathInfo) {

    this.router.navigate(['home']).then(() => {
      this.favoriteRouteLoadingService.loadFavoriteRoute.next(path);
    });
  }
}
