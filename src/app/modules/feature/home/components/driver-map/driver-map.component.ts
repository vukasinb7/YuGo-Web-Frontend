import {AfterViewInit, Component} from '@angular/core';
import * as L from "leaflet";
import {DriverRideNotificationService} from "../../../ride/services/driver-ride-notification.service";
import {Coordinates} from "../../../ride/model/Coordinates";
import {take} from "rxjs";
import {Marker} from "leaflet";

@Component({
  selector: 'app-driver-map',
  templateUrl: './driver-map.component.html',
  styleUrls: ['./driver-map.component.css']
})
export class DriverMapComponent implements AfterViewInit{
  private map:any;
  private driverLocation?:Coordinates;
  private driverLocationMarker?:Marker;

  constructor(private driverRideService:DriverRideNotificationService) {
  }

  private initMap():void{
    this.map = L.map('map-driver', {
      center:[this.driverLocation!.latitude, this.driverLocation!.longitude],
      scrollWheelZoom:false,
      zoom:13
    });
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
  }

  ngAfterViewInit(): void {
    L.Marker.prototype.options.icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
      iconAnchor: [12.5, 41]
    });
    this.driverRideService.currentDriverLocation.pipe(take(1)).subscribe(coordinates => {
      this.driverLocation = coordinates;
      this.initMap();
    });
    this.driverRideService.currentDriverLocation.subscribe(coordinates => {
      this.driverLocation = coordinates;
      if(this.driverLocationMarker){
        this.driverLocationMarker.setLatLng([coordinates.latitude, coordinates.longitude]);
      }else {
        this.driverLocationMarker = L.marker([coordinates.latitude, coordinates.longitude]).addTo(this.map);
      }
    });
  }
}
