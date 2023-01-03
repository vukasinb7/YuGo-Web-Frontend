import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {
  VehicleTypeCardComponent,
  VehicleTypeCardData,
} from "../vehicle-type-card/vehicle-type-card.component";
import {Subject} from "rxjs";
import {VehicleTypeService} from "../../services/vehicle-type.service";
import {DestinationPickerService} from "../../services/destination-picker.service";

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
  estMinutes:number = 0;
  rideLength:number = 0;
  constructor(private vehicleTypeService:VehicleTypeService, private destinationPickerService:DestinationPickerService) {
  }
  ngOnInit():void{
    this.destinationPickerService.path.subscribe((path) => {
      if(path){
        path.on('routesfound', (e:any) => {
          let routes = e.routes;
          let summary = routes[0].summary;
          this.rideLength = Math.round(summary.totalDistance * 100 / 1000) / 100;
          this.estMinutes = Math.round(summary.totalTime % 3600 * 100 / 60) / 100;
          this.vehicleTypeService.getVehicleTypesAsRideProperty(this.rideLength).then(data => {
            this.vehicleTypes = data;
          });

        });
      }
    });

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
