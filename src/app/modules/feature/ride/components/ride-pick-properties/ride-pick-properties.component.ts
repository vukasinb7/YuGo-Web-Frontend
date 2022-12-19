import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {VehicleTypeCardComponent, VehicleTypeDetailed} from "../vehicle-type-card/vehicle-type-card.component";
import {Time} from "@angular/common";
import {Subject} from "rxjs";

@Component({
  selector: 'app-ride-pick-properties',
  templateUrl: './ride-pick-properties.component.html',
  styleUrls: ['./ride-pick-properties.component.css']
})
export class RidePickPropertiesComponent implements OnInit{
  @Output() changeFormPageEmitter = new EventEmitter<number>();
  vehicleTypes:VehicleTypeDetailed[] = [];
  selectedVehicleType?:VehicleTypeDetailed;
  changeCarTypeEvent:Subject<number> = new Subject<number>();
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
    this.changeFormPageEmitter.emit(1);
  }
  previousFormPage():void{
    this.changeFormPageEmitter.emit(-1);
  }
  changeVehicleType(index:number):void{
    this.changeCarTypeEvent.next(index);
    this.selectedVehicleType = this.vehicleTypes.at(index);
  }
}
