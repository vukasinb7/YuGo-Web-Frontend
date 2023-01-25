import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import * as L from "leaflet";
import {interval} from "rxjs";
import {MapService} from "../../services/map.service";
import {VehicleService} from "../../../../shared/services/vehicle.service";
import {RideService} from "../../../ride/services/ride.service";
import {MatDialog} from "@angular/material/dialog";
import {
  HistoryDetailedRideCardComponent
} from "../../../history/components/history-detailed-ride-card/history-detailed-ride-card.component";
import {RideInfo} from "../../../../shared/models/RideInfo";
import {Vehicle} from "../../../../shared/models/Vehicle";
import {PanicService} from "../../../../shared/services/panic.service";

@Component({
  selector: 'app-admin-map',
  templateUrl: './admin-map.component.html',
  styleUrls: ['./admin-map.component.css']
})
export class AdminMapComponent implements AfterViewInit, OnDestroy{
  private map:any;
  private vehiclesMarkersLayout:any;
  private vehiclesMarkersMap = new Map<number, any>();
  private counter = 0;
  constructor(private _mapService:MapService, private _vehicleService: VehicleService,
              private _rideService: RideService, private _dialog: MatDialog,
              private _panicService: PanicService){
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
        if (ride != null) {
          this._panicService.getPanicByRideId(ride.id).subscribe({
            next: panic => {
              let iconPath = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png'
              if (panic != null) {
                iconPath = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'
              }

              const markerIcon = new L.Icon({
                iconUrl: iconPath,
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [0, -35],
                shadowSize: [41, 41]
              });

              const marker = L.marker([vehicle.currentLocation.latitude, vehicle.currentLocation.longitude], {icon: markerIcon})
                .on('mousedown', () => this.openRideInfo(ride)).bindPopup("Click for ride info").on('mouseover', () => {
                  marker.openPopup();
                });

              this.vehiclesMarkersLayout.addLayer(marker);
              this.vehiclesMarkersMap.set(vehicle.id, marker);
              this.vehiclesMarkersLayout.addTo(this.map);
            }});
        }
        else{
          const markerIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -35],
            shadowSize: [41, 41]
          });

          const marker = L.marker([vehicle.currentLocation.latitude, vehicle.currentLocation.longitude], {icon: markerIcon})
            .bindPopup("No active ride")
            .on('mouseover',() => {
              marker.openPopup();
            });
          this.vehiclesMarkersLayout.addLayer(marker);
          this.vehiclesMarkersMap.set(vehicle.id, marker);
          this.vehiclesMarkersLayout.addTo(this.map);
        }
      }});
  }

  private openRideInfo(ride: RideInfo){
    const ridePreview = this._dialog.open(HistoryDetailedRideCardComponent, {
      minWidth: '300px',
      maxWidth: '500px',
      minHeight: '650px',
      width: '30%',
      height: '50%',
    })
    const ridePreviewDialogInstance = ridePreview.componentInstance;
    ridePreviewDialogInstance.ride = ride;
    ridePreviewDialogInstance.historyPreview = false;
  }

  private initMap():void{
    this.map = L.map('map-admin', {
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

  ngAfterViewInit(): void {
    L.Marker.prototype.options.icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -35],
      shadowSize: [41, 41]
    });
    this.initMap();
  }

  ngOnDestroy() {
    this.map.off();
    this.map.remove();
  }
}
