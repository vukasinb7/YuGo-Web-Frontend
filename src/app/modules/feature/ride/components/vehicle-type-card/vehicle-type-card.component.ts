import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Time} from "@angular/common";
import {Observable, Subscription} from "rxjs";
@Component({
  selector: 'app-vehicle-type-card',
  templateUrl: './vehicle-type-card.component.html',
  styleUrls: ['./vehicle-type-card.component.css']
})
export class VehicleTypeCardComponent implements OnInit{
  @Input() vehicleType?:VehicleTypeCardData;
  @Input() index?:number;
  @Input() selectionChangedEvent?: Observable<number>;
  selectionChangedEventSubscription?:Subscription;
  isChecked:boolean = false;

  onClick():void{
    this.isChecked = !this.isChecked;
  }

  constructor() {}
  ngOnInit():void{
    this.selectionChangedEventSubscription = this.selectionChangedEvent?.subscribe((n:number) => {
      this.isChecked = this.index == n;
    });
  }
  ngOnDestroy(){
    this.selectionChangedEventSubscription?.unsubscribe();
  }
}
export interface VehicleTypeCardData {
  vehicleTypeName:string;
  imgPath:string;
  totalPrice:number;
}
export interface VehicleType{
  id:number;
  vehicleTypeName:string;
  imgPath:string;
  pricePerKM:number;
}
