import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {UserInfo} from "../models/UserInfo";
import {environment} from "../../../../enviroments/environment";
import {FavoritePathInfo} from "../../feature/favorite-path/models/FavoritePathInfo";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FavoritePathService {

  constructor(private http: HttpClient) { }

  getFavoritePaths(userId:number):Observable<FavoritePathInfo[]>{
    return this.http.get<FavoritePathInfo[]>(environment.apiHost + `ride/favorites/${userId}`);
  }
}
