import { Injectable } from '@angular/core';
import {FavoritePathInfo} from "../../favorite-path/models/FavoritePathInfo";
import {ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavoriteRouteLoadingService {


  loadFavoriteRoute:ReplaySubject<FavoritePathInfo> = new ReplaySubject<FavoritePathInfo>(1);
}
