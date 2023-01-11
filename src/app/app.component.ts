import { Component } from '@angular/core';
import {
  HistoryDetailedDialogComponent
} from "./modules/feature/history/components/history-detailed-dialog/history-detailed-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {RideOfferCardComponent} from "./modules/feature/ride/components/ride-offer-card/ride-offer-card.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../styles/styles.css','./app.component.css']
})
export class AppComponent {
  title = 'YuGo';
  constructor(private dialog:MatDialog) {
  }

  openDialog() {
    this.dialog.open(RideOfferCardComponent,{
      width: '60%',
      maxWidth: '350px',
      backdropClass: 'backdropBackground'
    })
  }
}
