import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {VehicleTypeDetailed} from "../vehicle-type-card/vehicle-type-card.component";
import {Time} from "@angular/common";

@Component({
  selector: 'app-ride-pick-properties',
  templateUrl: './ride-pick-properties.component.html',
  styleUrls: ['./ride-pick-properties.component.css']
})
export class RidePickPropertiesComponent implements OnInit{
  @Output() changeFormPageEmiter = new EventEmitter<number>();
  vehicleTypes:VehicleTypeDetailed[] = [];
  constructor() {
  }
  ngOnInit():void{
    this.vehicleTypes.push({
      price:13.99,
      vehicleType:"Standard",
      carImageSrc:"../../../../../../assets/img/vehicle_type/car_model.png",
      dropoffTime: {hours:12, minutes:40} as Time,
      minutesTillArrival:16
    } as VehicleTypeDetailed);
    this.vehicleTypes.push({
      price:19.99,
      vehicleType:"Lux",
      carImageSrc:"../../../../../../assets/img/vehicle_type/car_model.png",
      dropoffTime: {hours:12, minutes:40} as Time,
      minutesTillArrival:16
    } as VehicleTypeDetailed);
    this.vehicleTypes.push({
      price:15.99,
      vehicleType:"Van",
      carImageSrc:"../../../../../../assets/img/vehicle_type/car_model.png",
      dropoffTime: {hours:12, minutes:40} as Time,
      minutesTillArrival:16
    } as VehicleTypeDetailed);
  }

  nextFormPage():void{
    this.changeFormPageEmiter.emit(1);
  }
  previousFormPage():void{
    this.changeFormPageEmiter.emit(-1);
  }
}
