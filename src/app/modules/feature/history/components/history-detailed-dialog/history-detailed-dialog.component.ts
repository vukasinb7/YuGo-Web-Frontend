import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserInfo} from "../../../../shared/models/UserInfo";
import {RideInfo} from "../../../../shared/models/RideInfo";
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-history-detailed-dialog',
  templateUrl: './history-detailed-dialog.component.html',
  styleUrls: ['./history-detailed-dialog.component.css']
})
export class HistoryDetailedDialogComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public ride: RideInfo, private authService:AuthService) {

  }
  userType:any;
  ngOnInit() {
    this.authService.userState$.subscribe(value => this.userType = value);
  }


}
