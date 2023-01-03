import { Injectable } from '@angular/core';
import {environment} from "../../../../../enviroments/environment";
import {HttpClient} from "@angular/common/http";
import {VehicleType, VehicleTypeCardData} from "../components/vehicle-type-card/vehicle-type-card.component";
import {ImageService} from "../../../core/services/image.service";

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  constructor(private http:HttpClient, private imageService:ImageService) { }
  getVehicleTypesAsRideProperty(distance:number):Promise<VehicleTypeCardData[]>{
    return new Promise<VehicleTypeCardData[]>( resolve => {
      let output:VehicleTypeCardData[] = [];
      this.http.get<VehicleType[]>(environment.apiHost + 'vehicleType').subscribe(
        (vehicleTypes:VehicleType[]) =>{
          for(let vehicleType of vehicleTypes){
            this.imageService.getImage(vehicleType.imgPath).then(resp => {
              let totalPrice = Math.round(distance / 1000.0 * vehicleType.pricePerKm * 100) / 100;
              let vehicleTypeCardData:VehicleTypeCardData = {
                id: vehicleType.id,
                image: resp,
                totalPrice: totalPrice,
                vehicleTypeName: vehicleType.vehicleType
              }
              output.push(vehicleTypeCardData);
            });
          }
        }
      );
      resolve(output);
    });
  }

}
