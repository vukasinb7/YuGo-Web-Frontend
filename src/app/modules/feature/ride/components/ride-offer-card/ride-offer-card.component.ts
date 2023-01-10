import {Component, Inject} from '@angular/core';
import {RideInfo} from "../../../../shared/models/RideInfo";
import {MapService} from "../../../home/services/map.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import * as L from "leaflet";

@Component({
  selector: 'app-ride-offer-card',
  templateUrl: './ride-offer-card.component.html',
  styleUrls: ['./ride-offer-card.component.css']
})
export class RideOfferCardComponent {
  private map:any;
  public ride: RideInfo;
  passengerName: string="John Doe";
  startLocation: string="Bulevar Oslobodjenja 30";
  endLocation: string="Majke Jevrosime 112";
  numOfPassengers: string="2";
  constructor(private mapService:MapService) {
    this.ride = {} as RideInfo;
  }
  private initMap():void{
    this.map = L.map('map', {
      center:[45.2396, 19.8227],
      scrollWheelZoom:false,
      zoom:12
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
    this.route();
  }
  search(): void {
    this.mapService.search('Strazilovska 19').subscribe({
      next: (result) => {
        L.marker([result[0].lat, result[0].lon])
          .addTo(this.map)
          .bindPopup('Pozdrav iz Strazilovske 19.')
          .openPopup();
      },
      error: () => {},
    });
  }
  route(): void {
    L.Routing.control({
      waypoints: [L.latLng(45.2396, 19.8227), L.latLng(45.2596, 19.8227)],
    }).addTo(this.map);
  }


  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    this.initMap();
  }

}
