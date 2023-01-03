import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {
  VehicleTypeCardComponent,
  VehicleTypeCardData,
} from "../vehicle-type-card/vehicle-type-card.component";
import {Subject} from "rxjs";
import {VehicleTypeService} from "../../services/vehicle-type.service";

@Component({
  selector: 'app-ride-pick-properties',
  templateUrl: './ride-pick-properties.component.html',
  styleUrls: ['./ride-pick-properties.component.css']
})
export class RidePickPropertiesComponent implements OnInit{
  @Output() changeFormPageEmitter = new EventEmitter<number>();
  vehicleTypes:VehicleTypeCardData[] = [];
  selectedVehicleType?:VehicleTypeCardData;
  changeCarTypeEvent:Subject<number> = new Subject<number>();
  constructor(private vehicleTypeService:VehicleTypeService) {
  }
  ngOnInit():void{
    this.vehicleTypeService.getVehicleTypesAsRideProperty(2000.1).then(data => this.vehicleTypes = data);
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
