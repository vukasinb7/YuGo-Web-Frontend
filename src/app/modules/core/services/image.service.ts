import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../enviroments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }
  getImage(imgPath:string):Promise<any>{
    return new Promise<any>(resolve => {
      this.http.get(environment.apiHost + `image/${imgPath}`, {observe:'response', responseType: 'blob'}).subscribe(resp => {
        resolve(resp.body);
      });
    });
  }
}
