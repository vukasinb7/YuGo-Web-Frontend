import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserInfo} from "../../../account/models/UserInfo";
import {RideInfo} from "../../../account/models/RideInfo";

@Component({
  selector: 'app-history-detailed-dialog',
  templateUrl: './history-detailed-dialog.component.html',
  styleUrls: ['./history-detailed-dialog.component.css']
})
export class HistoryDetailedDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public ride: RideInfo) {

  }


}
