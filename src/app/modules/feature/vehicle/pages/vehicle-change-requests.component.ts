import { Component } from '@angular/core';
import {VehicleService} from "../../../shared/services/vehicle.service";
import {take} from "rxjs";
import {VehicleChangeRequest} from "../model/VehicleChangeRequest";

@Component({
  selector: 'app-vehicle-change-requests',
  templateUrl: './vehicle-change-requests.component.html',
  styleUrls: ['./vehicle-change-requests.component.css']
})
export class VehicleChangeRequestsComponent {
  constructor(private _vehicleService: VehicleService) {
    this.loadData();
  }

  loadData() : void{
    this._vehicleService.getVehicleChangeRequests().pipe(take(1)).subscribe({
      next: (vehicleChangeRequests) => {
        console.log(vehicleChangeRequests);
      },
      error : () => {

      }
    });
  }
}
