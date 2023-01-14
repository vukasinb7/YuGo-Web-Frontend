import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {environment} from "../../../../../enviroments/environment";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {MatDialog} from "@angular/material/dialog";
import {RideOfferCardComponent} from "../../ride/components/ride-offer-card/ride-offer-card.component";
import {Frame} from "stompjs";
import {RideService} from "../../ride/services/ride.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  private serverUrl = environment.apiHost + 'socket'
  private stompClient: any;
  isLoaded: boolean = false;

  private role: string | undefined;
  private userID: number | undefined;

  constructor(private authService:AuthService, private dialog: MatDialog, private rideService:RideService) {
  }

  ngOnInit(): void {
    this.initializeWebSocketConnection();
    this.authService.userState$.subscribe(value => {
      this.role = value;
      this.userID = this.authService.getId();
      this.subscribeToSocket();
    });
  }
  private subscribeToSocket(){
    if(this.isLoaded){
      if(this.role == "DRIVER"){
        this.stompClient.subscribe("/ride-topic/driver-request/" + this.userID, (frame:Frame) => {
          this.parseRideRequest(frame);
        });
      }
      if(this.role == "PASSENGER"){
        this.stompClient.subscribe("/ride-topic/notify-passenger/" + this.userID, (frame:Frame) => {
          this.notifyPassengerAboutRide(frame);
        });
      }
    }
  }
  notifyPassengerAboutRide(frame:Frame){
    let message:{rideID:number} = JSON.parse(frame.body);
    this.rideService.getRide(message.rideID).subscribe(ride => {
      this.rideService.rideSearchCompleted.next(ride);
    });
  }
  parseRideRequest(frame:Frame){
    let message:{rideID:number} = JSON.parse(frame.body);
    console.log(message);

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
  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect({}, function () {
      that.isLoaded = true;
    });
  }
}
