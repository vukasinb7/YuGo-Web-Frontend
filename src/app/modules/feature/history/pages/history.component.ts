import { Component } from '@angular/core';
import {RegisterComponent} from "../../../core/components/register/register.component";
import {MatDialog} from '@angular/material/dialog';
import {HistoryDetailedDialogComponent} from "../components/history-detailed-dialog/history-detailed-dialog.component";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  constructor(public dialog: MatDialog) {}
  openDetailedDialog(){
    this.dialog.open(HistoryDetailedDialogComponent, {
      width: '75%',
      backdropClass: 'backdropBackground'
    });
  }

}
