import { Injectable } from '@angular/core';
import {FavoritePathInfo} from "../../favorite-path/models/FavoritePathInfo";
import {ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavoriteRouteLoadingService {

  constructor() { }

  loadFavoriteRoute:ReplaySubject<FavoritePathInfo> = new ReplaySubject<FavoritePathInfo>(1);
}
