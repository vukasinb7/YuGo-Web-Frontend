import { Injectable } from '@angular/core';
import {FavoritePathInfo} from "../../favorite-path/models/FavoritePathInfo";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavoriteRouteLoadingService {

  constructor() { }

  loadFavoriteRoute:Subject<FavoritePathInfo> = new Subject<FavoritePathInfo>()
}
