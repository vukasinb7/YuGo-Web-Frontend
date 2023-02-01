import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RideOfferCardComponent} from "./modules/feature/ride/components/ride-offer-card/ride-offer-card.component";
import {environment} from "../enviroments/environment";
import {AuthService} from "./modules/core/services/auth.service";
import {RideService} from "./modules/feature/ride/services/ride.service";
import {Frame} from "stompjs";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {Coordinates} from "./modules/feature/ride/model/Coordinates";
import {PassengerRideNotificationsService} from "./modules/feature/ride/services/passenger-ride-notifications.service";
import {DriverRideNotificationService} from "./modules/feature/ride/services/driver-ride-notification.service";
import {DriverService} from "./modules/shared/services/driver.service";
import {PanicService} from "./modules/shared/services/panic.service";
import {take} from "rxjs";
import {PanicCardComponent} from "./modules/feature/panic/components/panic-card/panic-card.component";
import {
  HistoryDetailedDialogComponent
} from "./modules/feature/history/components/history-detailed-dialog/history-detailed-dialog.component";
import {
  HistoryReviewCardPassengerComponent
} from "./modules/feature/history/components/history-review-card-passenger/history-review-card-passenger.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../styles/styles.css','./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'YuGo';
  private serverUrl = environment.apiHost + 'socket'
  private stompClient: any;
  isLoaded: boolean = false;

  private role: string | undefined;
  private userID: number | undefined;

  constructor(private authService:AuthService,
              private dialog: MatDialog,
              private rideService:RideService,
              private passengerRideService:PassengerRideNotificationsService,
              private driverRideService:DriverRideNotificationService,
              private driverService:DriverService,
              private panicService: PanicService) {
  }

  ngOnInit(): void {
    this.initializeWebSocketConnection();
    this.role = this.authService.getRole();
    this.userID = this.authService.getId();
    this.authService.userState$.subscribe(value => {
      this.role = value;
      this.userID = this.authService.getId();
      this.subscribeToSocket();
    });
  }
  private subscribeToSocket(){
    if(this.isLoaded){
      if(this.role == "DRIVER"){
        this.driverService.getLocation(this.userID!).subscribe(coordinates => {
          this.driverRideService.currentDriverLocation.next(coordinates);
        });
        this.stompClient.subscribe("/ride-topic/driver-request/" + this.userID, (frame:Frame) => {
          this.parseRideRequest(frame);
        }, {id:"driver-request"});
      }
      else if(this.role == "PASSENGER"){
        this.stompClient.subscribe("/ride-topic/notify-passenger/" + this.userID, (frame:Frame) => {
          this.notifyPassengerAboutRide(frame);
        },{id:"notify-passenger"});
        this.stompClient.subscribe("/ride-topic/notify-added-passenger/" + this.userID, (frame:Frame) => {
          let message:{rideID:number} = JSON.parse(frame.body);
          this.rideService.getRide(message.rideID).subscribe(ride => {
            this.passengerRideService.passengerAddedToRideEvent.next(ride);
          });
        });
      }
      else if (this.role == "ADMIN"){
        this.stompClient.subscribe("/ride-topic/notify-admin-panic", (frame: Frame) => {
          this.notifyAdminAboutPanic(frame);
        }, {id:"admin-panic"})
      }
    }
  }
  notifyAdminAboutPanic(frame: Frame){
    const message:{panicId:number} = JSON.parse(frame.body);
    this.panicService.getPanic(message.panicId).pipe(take(1)).subscribe({
        next: panic =>{
          const panicDialog = this.dialog.open(PanicCardComponent, {
            minWidth: '350px',
            minHeight: '300px',
            width: '30%',
            height: '40%',
          })
          const panicDialogInstance = panicDialog.componentInstance;
          panicDialogInstance.panic = panic;
          panicDialogInstance.notification = true;
        }
      }
    )
  }
  notifyPassengerAboutRide(frameRide:Frame){
    let message:{rideID:number} = JSON.parse(frameRide.body);
    if(message.rideID == -1){
      this.passengerRideService.rideNotAvailableEvent.next();
      return;
    }
    this.rideService.getRide(message.rideID).subscribe(ride => {
      if(ride.status == "ACCEPTED"){
        this.passengerRideService.rideAcceptedEvent.next(ride);
        this.stompClient.subscribe("/ride-topic/notify-passenger-vehicle-arrival/" + this.userID, () => {
          this.passengerRideService.vehicleArrivedEvent.next();
        }, {id:"notify-passenger-vehicle-arrival"});
        this.stompClient.subscribe("/ride-topic/notify-passenger-start-ride/" + this.userID, () => {
          this.stompClient.subscribe("/ride-topic/notify-passenger-vehicle-location/" + this.userID, (frameLocation:Frame) => {
            let coordinates:Coordinates = JSON.parse(frameLocation.body);
            this.passengerRideService.driverLocationUpdatedEvent.next(coordinates);
          }, {id:"notify-passenger-vehicle-location"});
          this.rideService.currentRide = ride;
          this.passengerRideService.startRideEvent.next(ride);
          this.stompClient.unsubscribe("notify-passenger-start-ride");
          this.stompClient.subscribe("/ride-topic/notify-passenger-end-ride/" + this.userID, () => {
            this.dialog.open(HistoryReviewCardPassengerComponent,{
              data: {ride:ride, userId:this.authService.getId(), role:this.role},
              width: '60%',
              maxWidth: '600px',
              backdropClass: 'backdropBackground',
              hasBackdrop:true
            })
            this.passengerRideService.endRideEvent.next(ride);
            this.rideService.currentRide = undefined;
            this.stompClient.unsubscribe("notify-passenger-end-ride");
            this.stompClient.unsubscribe("notify-passenger-vehicle-location");
            this.stompClient.unsubscribe("notify-passenger-vehicle-arrival");
            this.stompClient.unsubscribe("notify-passenger-vehicle-arrival");
          }, {id:"notify-passenger-end-ride"});
        }, {id:"notify-passenger-start-ride"});
      }
      else if(ride.status == "REJECTED"){
        this.passengerRideService.rideRejectedEvent.next(ride);
      }
    });
  }
  parseRideRequest(frame:Frame){
    const message:{rideID:number} = JSON.parse(frame.body);
    this.rideService.getRide(message.rideID).subscribe(ride => {
      this.dialog.open(RideOfferCardComponent,{
        width: '20%',
        minWidth: '400px',
        minHeight: '420px',
        height:'50%',
        disableClose:true,
        data:ride
      });
    });
  }
  ngOnDestroy(){
    this.stompClient.unsubscribe("driver-request");
    this.stompClient.unsubscribe("notify-passenger");
    this.stompClient.unsubscribe("admin-panic");
    this.stompClient.unsubscribe("notify-passenger-end-ride");
    this.stompClient.unsubscribe("notify-passenger-start-ride");
  }
  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;

    this.stompClient.connect({}, function () {
      that.isLoaded = true;
      that.subscribeToSocket();
    });
  }

}
