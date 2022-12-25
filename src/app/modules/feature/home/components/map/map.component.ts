import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import {Control, LatLng, latLng, LeafletMouseEvent, Marker} from 'leaflet';
import 'leaflet-routing-machine';
import {MapService} from "../../services/map.service";
import {DestinationPickerService} from "../../../ride/services/destination-picker.service";
import {Address} from "../../../ride/model/Address";
import {Observable} from "rxjs";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit{
  private map:any;
  private fromAddressMarker?:Marker;
  private toAddressMarker?:Marker;
  private canSelectFromAddress:boolean = false;
  private canSelectToAddress:boolean = false;
  private path?:Control;
  constructor(private mapService:MapService, private destinationPickerService:DestinationPickerService) {
  }
  private initMap():void{
    this.map = L.map('map', {
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
    //this.route();
  }
  search(): void {
    this.mapService.search('Strazilovska 19').subscribe({
      next: (result) => {
        console.log(result);
        L.marker([result[0].lat, result[0].lon])
          .addTo(this.map)
          .bindPopup('Pozdrav iz Strazilovske 19.')
          .openPopup();
      },
      error: () => {},
    });
  }
  route(fromLat:number, fromLong:number, toLat:number, toLong:number): void {
    if(this.path){
      this.map.removeControl(this.path);
    }
    this.path = L.Routing.control({
      addWaypoints:false,
      waypoints: [L.latLng(fromLat, fromLong), L.latLng(toLat, toLong)],
    }).addTo(this.map);

  }

  private addMarker(): void {
    const lat: number = 45.25;
    const lon: number = 19.8228;
    L.marker([lat, lon])
      .addTo(this.map)
      .bindPopup('Trenutno se nalazite ovde.')
      .openPopup();
  }

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();

    this.destinationPickerService.currentFromAddress.subscribe({
      next:(address:Address) => {
        if(this.fromAddressMarker){
          this.map.removeControl(this.fromAddressMarker);
        }
        this.fromAddressMarker = L.marker([address.lat, address.long]).addTo(this.map);
      }
    });
    this.destinationPickerService.currentToAddress.subscribe({
      next:(address:Address) => {
        if(this.toAddressMarker){
          this.map.removeControl(this.toAddressMarker);
        }
        this.toAddressMarker = L.marker([address.lat, address.long]).addTo(this.map);
      }
    });
    this.destinationPickerService.enableManualFromAddressSelection.subscribe({
      next:()=>{
        this.canSelectFromAddress = true;
      }
    });
    this.destinationPickerService.enableManualToAddressSelection.subscribe({
      next:()=>{
        this.canSelectToAddress = true;
      }
    });
    this.map.on('click', (e:LeafletMouseEvent)=>{
      if(this.canSelectFromAddress){
        this.fromAddressMarker = L.marker(e.latlng).addTo(this.map);
        this.reverseAddressSearch(e.latlng.lat, e.latlng.lng).then((address:Address)=>{
          this.destinationPickerService.manuallySelectedFromAddress.next(address);
          this.canSelectFromAddress = false;
        });
        this.checkForPath();
      }
    });
    this.map.on('click', (e:LeafletMouseEvent)=>{
      if(this.canSelectToAddress){
        this.toAddressMarker = L.marker(e.latlng).addTo(this.map);
        this.reverseAddressSearch(e.latlng.lat, e.latlng.lng).then((address:Address) => {
          this.destinationPickerService.manuallySelectedToAddress.next(address);
          this.canSelectToAddress = false;
        });
        this.checkForPath();
      }
    });
  }
  private checkForPath(){
    if(this.toAddressMarker && this.fromAddressMarker){
      let fromLatlng:any = this.fromAddressMarker.getLatLng();
      let toLatlng:any = this.toAddressMarker.getLatLng();
      this.route(fromLatlng.lat, fromLatlng.lng, toLatlng.lat, toLatlng.lng);
    }
  }
  private reverseAddressSearch(lat:number, lng:number): Promise<Address>{
    return new Promise<Address>( resolve => {
        let address:Address = {lat: 0, long: 0, name: ""};
        this.mapService.reverseSearch(lat, lng).subscribe((val:any) => {
          address.name = val.display_name;
          address.lat = lat;
          address.long = lng;
          resolve(address);
        });
      })

  }
}
