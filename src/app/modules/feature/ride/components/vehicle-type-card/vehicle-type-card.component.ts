import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Time} from "@angular/common";
@Component({
  selector: 'app-vehicle-type-card',
  templateUrl: './vehicle-type-card.component.html',
  styleUrls: ['./vehicle-type-card.component.css']
})
export class VehicleTypeCardComponent implements OnInit{
  @Input() vehicleType?:VehicleTypeDetailed;
  isChecked:boolean = false;

  onClick():void{
    this.isChecked = !this.isChecked;
    console.log(this.isChecked);
  }

  constructor() {}
  ngOnInit():void{

  }
}

export interface VehicleTypeDetailed{
  carImageSrc: string;
  price:number;
  minutesTillArrival:number;
  dropoffTime:Time;
  vehicleType:string;
}
