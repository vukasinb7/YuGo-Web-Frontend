import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import * as L from "leaflet";
import {Control, Marker} from "leaflet";
import {Subscription} from "rxjs";
import {MapService} from "../../services/map.service";

@Component({
  selector: 'app-admin-map',
  templateUrl: './admin-map.component.html',
  styleUrls: ['./admin-map.component.css']
})
export class AdminMapComponent implements AfterViewInit, OnDestroy{
  private map:any;
  constructor(private mapService:MapService){
  }
  private initMap():void{
    this.map = L.map('map-admin', {
      center:[45.2396, 19.8227],
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
    this.initMap();
  }

  ngOnDestroy() {
    this.map.off();
    this.map.remove();
  }
}
