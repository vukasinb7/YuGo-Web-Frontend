import { Injectable } from '@angular/core';
import {environment} from "../../../../../enviroments/environment";
import {HttpClient} from "@angular/common/http";
import {VehicleType, VehicleTypeCardData} from "../components/vehicle-type-card/vehicle-type-card.component";

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  constructor(private http:HttpClient) { }
  getVehicleTypesAsRideProperty(/* Should contain parameters in form of distance */):VehicleTypeCardData[]{
    let output:VehicleTypeCardData[] = [];
    this.http.get<VehicleType[]>(environment.apiHost + "vehicleType").subscribe({
      next:(types:VehicleType[]) => {
        for(let type of types){
          let price:number = -1;
          this.http.get<any>(environment.apiHost + "vehicleType/price",
            {params : {
                vehicle_type_id: type.id,
                from_lat: 1,
                from_lng:1,
                to_lat:1,
                to_lng:1
            }}).subscribe({
            next:(val:number)=>{
              price = val;
            }
          });
          let data:VehicleTypeCardData = {
            vehicleTypeName:type.vehicleTypeName,
            imgPath:type.imgPath,
            totalPrice:price
          } as VehicleTypeCardData;
          output.push(data);
        }
      }
    })
    return output;
  }

}
