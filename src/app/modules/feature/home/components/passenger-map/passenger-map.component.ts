import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import {Control, LeafletMouseEvent, Marker} from 'leaflet';
import 'leaflet-routing-machine';
import {MapService} from "../../services/map.service";
import {DestinationPickerService} from "../../../ride/services/destination-picker.service";
import {LocationInfo} from "../../../../shared/models/LocationInfo";
import {RideService} from "../../../ride/services/ride.service";
import {interval, Subscription} from "rxjs";
import {PassengerRideNotificationsService} from "../../../ride/services/passenger-ride-notifications.service";
import {DriverRideNotificationService} from "../../../ride/services/driver-ride-notification.service";
import {Vehicle} from "../../../../shared/models/Vehicle";
import {VehicleService} from "../../../../shared/services/vehicle.service";

@Component({
  selector: 'app-passenger-map',
  templateUrl: './passenger-map.component.html',
  styleUrls: ['./passenger-map.component.css']
})
export class PassengerMapComponent implements AfterViewInit{
  private map:any;
  private fromAddressMarker?:Marker;
  private driverLocationMarker?:Marker;
  private toAddressMarker?:Marker;
  private canSelectFromAddress = false;
  private canSelectToAddress = false;
  private path?:Control;
  private driverLocationSubscription?:Subscription;

  private vehiclesMarkersLayout:any;
  private vehiclesMarkersMap = new Map<number, any>();
  private counter = 0;
  constructor(private mapService:MapService,
              private destinationPickerService:DestinationPickerService,
              private rideService:RideService,
              private passengerRideService:PassengerRideNotificationsService,
              private driverRideService:DriverRideNotificationService,
              private _vehicleService: VehicleService,
              private _rideService: RideService) {
    interval(1000).subscribe((() => {
      this.updateVehicles();
    }));
  }

  updateVehicles(){
    this._vehicleService.getAllVehicles().subscribe({
      next: (vehicles) => {
        if (this.counter%30 == 0 ){
          this.vehiclesMarkersLayout.clearLayers();
        }

        vehicles.forEach((vehicle) => {
          if (this.counter%30 == 0){
            this.recreateMarker(vehicle);
          }
          else{
            if (this.vehiclesMarkersMap.get(vehicle.id)) {
              this.vehiclesMarkersMap.get(vehicle.id).setLatLng([vehicle.currentLocation.latitude, vehicle.currentLocation.longitude]);
            }
          }
        });

        this.counter++;
      }});
  }

  recreateMarker(vehicle: Vehicle){
    this._rideService.getDriverActiveRide(vehicle.driverId).subscribe({
      next: (ride) => {
        let iconPath = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
        if (ride != null) {
          iconPath = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png';
        }
        let markerIcon = new L.Icon({
          iconUrl: iconPath,
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [0, -35],
          shadowSize: [41, 41]
        });
        let marker = L.marker([vehicle.currentLocation.latitude, vehicle.currentLocation.longitude], {icon: markerIcon});
        this.vehiclesMarkersLayout.addLayer(marker);
        this.vehiclesMarkersMap.set(vehicle.id, marker);
        this.vehiclesMarkersLayout.addTo(this.map);
      }});
  }

  private initMap():void{
    this.map = L.map('map', {
      center:[45.2396, 19.8227],
      scrollWheelZoom:false,
      zoom:13
    });
    this.vehiclesMarkersLayout = L.layerGroup();
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

  route(fromLat:number, fromLong:number, toLat:number, toLong:number): void {
    if(this.path){
      this.map.removeControl(this.path);
    }
    this.path = L.Routing.control({
      addWaypoints:false,
      waypoints: [L.latLng(fromLat, fromLong), L.latLng(toLat, toLong)],
    }).addTo(this.map);
    this.destinationPickerService.path.next(this.path);
  }

  ngAfterViewInit(): void {
    const DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -35],
      shadowSize: [41, 41]
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();

    this.passengerRideService.rideAcceptedEvent.subscribe(() => {
      this.driverLocationSubscription = this.passengerRideService.driverLocationSubscriber.subscribe(coordinates => {
        if(this.driverLocationMarker){
          this.driverLocationMarker.setLatLng([coordinates.latitude, coordinates.longitude]);
        }else{
          this.driverLocationMarker = L.marker([coordinates.latitude, coordinates.longitude]).addTo(this.map);
        }
      });
    })
    this.passengerRideService.endRideEvent.subscribe(() => {
      this.driverLocationSubscription?.unsubscribe();
      this.map.removeControl(this.driverLocationMarker);
      this.driverLocationMarker = undefined;
    });

    this.destinationPickerService.currentFromAddress.subscribe({
      next:(address?:LocationInfo) => {
        if(this.fromAddressMarker){
          this.map.removeControl(this.fromAddressMarker);
        }
        if(!address){
          this.fromAddressMarker = undefined;
        }else{
          this.fromAddressMarker = L.marker([address.latitude, address.longitude]).addTo(this.map);
        }
        this.checkForPath();
      }
    });
    this.destinationPickerService.currentToAddress.subscribe({
      next:(address?:LocationInfo) => {
        if(this.toAddressMarker){
          this.map.removeControl(this.toAddressMarker);
        }
        if(!address){
          this.toAddressMarker = undefined;
        }else {
          this.toAddressMarker = L.marker([address.latitude, address.longitude]).addTo(this.map);
        }
        this.checkForPath();
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
      if(this.canSelectToAddress){
        if(this.toAddressMarker){
          this.map.removeControl(this.toAddressMarker);
        }
        this.toAddressMarker = L.marker(e.latlng).addTo(this.map);
        this.reverseAddressSearch(e.latlng.lat, e.latlng.lng).then((address:LocationInfo) => {
          this.destinationPickerService.manuallySelectedToAddress.next(address);
          this.canSelectToAddress = false;
          this.checkForPath();
        });
      }
      else if(this.canSelectFromAddress){
        if(this.fromAddressMarker){
          this.map.removeControl(this.fromAddressMarker);
        }
        this.fromAddressMarker = L.marker(e.latlng).addTo(this.map);
        this.reverseAddressSearch(e.latlng.lat, e.latlng.lng).then((address:LocationInfo)=>{
          this.destinationPickerService.manuallySelectedFromAddress.next(address);
          this.canSelectFromAddress = false;
          this.checkForPath();
        });
      }
    });
  }
  private checkForPath(){
    if(this.toAddressMarker && this.fromAddressMarker){
      const fromLatlng:any = this.fromAddressMarker.getLatLng();
      const toLatlng:any = this.toAddressMarker.getLatLng();
      this.route(fromLatlng.lat, fromLatlng.lng, toLatlng.lat, toLatlng.lng);
    }else{
      if(this.path){
        this.map.removeControl(this.path);
      }
      this.path = undefined;
      this.destinationPickerService.path.next(undefined);
    }
  }
  private reverseAddressSearch(lat:number, lng:number): Promise<LocationInfo>{
    return new Promise<LocationInfo>( resolve => {
        const address:LocationInfo = {latitude: 0, longitude: 0, address: ""};
        this.mapService.reverseSearch(lat, lng).subscribe((val:any) => {
          address.address = val.display_name;
          address.latitude = lat;
          address.longitude = lng;
          resolve(address);
        });
      })

  }
}
