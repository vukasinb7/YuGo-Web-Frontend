import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
@Component({
  selector: 'app-vehicle-type-card',
  templateUrl: './vehicle-type-card.component.html',
  styleUrls: ['./vehicle-type-card.component.css']
})
export class VehicleTypeCardComponent implements OnInit{
  @Input() vehicleType?:VehicleTypeCardData;
  @Input() index?:number;
  @Input() selectionChangedEvent?: Observable<number>;
  image:any;
  selectionChangedEventSubscription?:Subscription;
  isChecked:boolean = false;

  onClick():void{
    this.isChecked = !this.isChecked;
  }

  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit():void{
    this.selectionChangedEventSubscription = this.selectionChangedEvent?.subscribe((n:number) => {
      this.isChecked = this.index == n;
    });
  }
  ngOnDestroy(){
    this.selectionChangedEventSubscription?.unsubscribe();
  }

  ngAfterContentInit(): void {
    let objectURL = URL.createObjectURL(this.vehicleType?.image);
    this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
}
export interface VehicleTypeCardData {
  id:number;
  vehicleTypeName:string;
  image:any;
  totalPrice:number;
}
export interface VehicleType{
  id:number;
  vehicleType:string;
  imgPath:string;
  pricePerKm:number;
}
