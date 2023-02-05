import { AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {RideInfo} from "../../../../shared/models/RideInfo";
import {MapService} from "../../../home/services/map.service";
import * as L from "leaflet";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LocationInfo} from "../../../../shared/models/LocationInfo";
import {PassengerService} from "../../../../shared/services/passenger.service";
import {RideService} from "../../services/ride.service";
import {DriverRideNotificationService} from "../../services/driver-ride-notification.service";
import {ImageService} from "../../../../core/services/image.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-ride-offer-card',
  templateUrl: './ride-offer-card.component.html',
  styleUrls: ['./ride-offer-card.component.css']
})
export class RideOfferCardComponent implements OnInit,AfterViewInit{
  private map?:L.Map;
  passengerName="John Doe";
  startLocation="Bulevar Oslobodjenja 30";
  endLocation="Majke Jevrosime 112";
  numOfPassengers=2;
  rejectionText?:string = "";
  rejectionFormEnabled = false;
  public passengersProfilePics:Array<any>;
  public profilePicture:any="assets/img/ADMIN_AVATAR.png";

  constructor(private mapService:MapService,private dialogRef: MatDialogRef<RideOfferCardComponent>,
              @Inject(MAT_DIALOG_DATA) private data:RideInfo,
              private passengerService:PassengerService,
              private driverRideService:DriverRideNotificationService,
              private rideService:RideService, private imageService:ImageService,private sanitizer: DomSanitizer) {
    this.passengersProfilePics=[];
  }

  private initMap():void{
    this.map = L.map('ride-request-map', {
      center:[45.2396, 19.8227],
      scrollWheelZoom:false,
      dragging:false,
      zoomControl:false,
      doubleClickZoom:false,
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
  }
  route(depLat:number, depLng:number, destLat:number, destLng:number): void {
    if (this.map!=null) {
      L.Routing.control({
        addWaypoints: false,
        waypoints: [L.latLng(depLat, depLng), L.latLng(destLat, destLng)],
      }).addTo(this.map);
    }
  }


  ngAfterViewInit(): void {
    const DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
      iconAnchor:[12.5, 41]
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    this.initMap();
    const path=this.data.locations.at(0);
    if (path!=null) {
      const departure: LocationInfo = path.departure;
      const destination: LocationInfo = path.destination;
      this.route(departure.latitude, departure.longitude, destination.latitude, destination.longitude);
    }
  }

  rejectRide(){
    if(this.rejectionText){
      this.rideService.rejectRide(this.data.id, this.rejectionText).subscribe();
      this.dialogRef.close();
    }
  }

  acceptRide(){
    this.rideService.acceptRide(this.data.id).subscribe();
    this.dialogRef.close();
    this.driverRideService.queueRide(this.data);
  }

  ngOnInit(): void {
    this.getPassenger();
    this.getPassengers();
    const path=this.data.locations.at(0);
    if (path!=null) {
      const departure: LocationInfo = path.departure;
      const destination: LocationInfo = path.destination;
      let tokens: string[] = departure.address.split(',');
      const departureAddress: string = tokens[0] + " " + tokens[1] + " " + tokens[2];
      tokens = destination.address.split(',');
      const destinationAddress: string = tokens[0] + " " + tokens[1] + " " + tokens[2];
      this.startLocation = departureAddress;
      this.endLocation = destinationAddress;
      this.numOfPassengers = this.data.passengers.length;
      const mainPassenger = this.data.passengers.at(0);
      if (mainPassenger != null)
        this.passengerService.getPassenger(mainPassenger.id).subscribe(passenger => {
          this.passengerName = passenger.name + " " + passenger.surname;
        });
    }
  }

  getPassenger(){
    this.passengerService.getPassenger(this.data.passengers[0].id).subscribe(
      {next:(passenger) => {
          this.passengerName= passenger.name+" "+passenger.surname;
          this.imageService.getProfilePicture(passenger.profilePicture).then(resp => {
            const objectURL = URL.createObjectURL(resp);
            this.profilePicture={picture:this.sanitizer.bypassSecurityTrustUrl(objectURL),name:(passenger.name+" "+passenger.surname+"\n"+passenger.email+"\n"+passenger.telephoneNumber)};
          });
        }})
  }
  getPassengers(){
    for (let i = 0; i < this.data.passengers.length; i++) {
      this.passengerService.getPassenger(this.data.passengers[i].id).subscribe(
        {
          next: (passenger) => {
            this.imageService.getProfilePicture(passenger.profilePicture).then(resp => {
              const objectURL = URL.createObjectURL(resp);
              const dto={picture:this.sanitizer.bypassSecurityTrustUrl(objectURL),name:(passenger.name+" "+passenger.surname+"\n"+passenger.email+"\n"+passenger.telephoneNumber)};

              this.passengersProfilePics.push(dto);

            });
          }
        })
    }
  }
}
