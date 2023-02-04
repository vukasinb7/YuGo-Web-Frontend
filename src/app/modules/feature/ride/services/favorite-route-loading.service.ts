import { Injectable } from '@angular/core';
import {FavoritePathInfo} from "../../favorite-path/models/FavoritePathInfo";
import {BehaviorSubject, ReplaySubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavoriteRouteLoadingService {

  constructor() { }

  loadFavoriteRoute:ReplaySubject<FavoritePathInfo> = new ReplaySubject<FavoritePathInfo>(1);
}
