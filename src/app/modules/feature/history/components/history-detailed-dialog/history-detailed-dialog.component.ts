import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {RideInfo} from "../../../../shared/models/RideInfo";
import {RideDataInfo} from "../history-review-card-passenger/history-review-card-passenger.component";

@Component({
  selector: 'app-history-detailed-dialog',
  templateUrl: './history-detailed-dialog.component.html',
  styleUrls: ['./history-detailed-dialog.component.css']
})
export class HistoryDetailedDialogComponent{
  public ride : RideInfo;
  public userId : number;
  public role : string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: RideDataInfo) {
    this.ride = data.ride;
    this.userId = data.userId;
    this.role = data.role;
  }
}
