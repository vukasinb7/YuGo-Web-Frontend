import { Component } from '@angular/core';

@Component({
  selector: 'app-history-map-card',
  templateUrl: './history-map-card.component.html',
  styleUrls: ['./history-map-card.component.css']
})
export class HistoryMapCardComponent{
  private map:any;
  constructor(private mapService:MapService,@Inject(MAT_DIALOG_DATA) public ride: RideInfo) {
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
      waypoints: [L.latLng(this.ride.locations[0].departure.latitude, this.ride.locations[0].departure.longitude), L.latLng(this.ride.locations[0].destination.latitude, this.ride.locations[0].destination.longitude)],
    }).addTo(this.map);
  }

}
