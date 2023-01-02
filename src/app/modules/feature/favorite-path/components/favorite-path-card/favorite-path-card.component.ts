import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {RideInfo} from "../../../../shared/models/RideInfo";
import {FavoritePathInfo} from "../../models/FavoritePathInfo";
import {FavoritePathService} from "../../../../shared/services/favorite.path.service";
import {AuthService} from "../../../../core/services/auth.service";
import {
  HistoryDetailedDialogComponent
} from "../../../history/components/history-detailed-dialog/history-detailed-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {FavoritePathDetailedCardComponent} from "../favorite-path-detailed-card/favorite-path-detailed-card.component";

@Component({
  selector: 'app-favorite-path-card',
  templateUrl: './favorite-path-card.component.html',
  styleUrls: ['./favorite-path-card.component.css']
})
export class FavoritePathCardComponent implements OnInit{

  obs: Observable<any>;
  dataSource= new MatTableDataSource<FavoritePathInfo>();
  constructor(private favoritePathService:FavoritePathService,private authService:AuthService, public dialog: MatDialog) {
    this.obs = this.dataSource.connect();
  }
  ngOnInit() {
    this.loadData();
  }
  loadData(){
    this.favoritePathService.getFavoritePaths(this.authService.getId()).subscribe({next:(paths)=>{
      this.dataSource.data=paths;
      }})
  }
  viewDetails(path: any) {
    this.dialog.open(FavoritePathDetailedCardComponent,{
      data:path,
      width: '60%',
      backdropClass: 'backdropBackground'
    })

  }
}
