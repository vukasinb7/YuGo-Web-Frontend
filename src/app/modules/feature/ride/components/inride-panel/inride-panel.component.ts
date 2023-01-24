import {Component, Input, OnInit} from '@angular/core';
import {RideInfo} from "../../../../shared/models/RideInfo";
import {Observable} from "rxjs";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PanicDialogComponent} from "../panic-dialog/panic-dialog.component";
import {RideService} from "../../services/ride.service";

@Component({
  selector: 'app-inride-panel',
  templateUrl: './inride-panel.component.html',
  styleUrls: ['./inride-panel.component.css']
})
export class InridePanelComponent implements OnInit{
  progressBarHeight = "0%";
  departureAddress = "Bulevar oslobodjenja";
  destinationAddress = "Bulevar oslobodjenja 30"
  rideEstTime = "1hr 15min"
  rideLength = "55km"
  @Input() currentRide?:RideInfo;
  @Input() rideLengthKm?:number;
  @Input() distanceLeftChangedEvent?:Observable<number>;

  panicDialog?: MatDialogRef<PanicDialogComponent>;
  panicEnabled:boolean = true;

  constructor(private dialog: MatDialog, private rideService:RideService) {
  }

  openPanicDialog(){
    this.panicDialog = this.dialog.open(PanicDialogComponent);
    this.panicDialog.afterClosed().subscribe(res => {
      if(res != undefined){
        let rideID:number = this.rideService.currentRide!.id;
        this.rideService.createPanic(rideID, res.message).subscribe();
        this.panicEnabled = false;
      }
    });
  }

  ngOnInit(): void {
    this.destinationAddress = this.currentRide!.locations[0].destination.address;
    this.departureAddress = this.currentRide!.locations[0].departure.address;
    const estTimeMinutes:number = this.currentRide!.estimatedTimeInMinutes;
    const hours:number = Math.floor(estTimeMinutes / 60);
    const minutes:number = estTimeMinutes % 60;
    if(hours == 0){
      this.rideEstTime = `${minutes}min`;
    }else{
      this.rideEstTime = `${hours}hr ${minutes}min`;
    }
    this.rideLength = `${Math.round(this.rideLengthKm! * 10) / 10}km`;
    this.distanceLeftChangedEvent?.subscribe(distance => {
      let ridePercent:number = Math.ceil((1 - (distance / this.rideLengthKm!)) * 100);
      this.progressBarHeight = `${ridePercent}%`;
    });
  }
}
