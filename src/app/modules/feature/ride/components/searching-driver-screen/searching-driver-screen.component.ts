import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {RideInfo} from "../../../../shared/models/RideInfo";

@Component({
  selector: 'app-searching-driver-screen',
  templateUrl: './searching-driver-screen.component.html',
  styleUrls: ['./searching-driver-screen.component.css']
})
export class SearchingDriverScreenComponent implements OnInit{
  @Input() rideFoundEvent?:Observable<RideInfo>;
  @Input() errorMessageEvent?:Observable<string>;
  text:string = "We are searching a driver for your ride, please wait."
  loading:boolean = true;
  ngOnInit(){
    this.rideFoundEvent?.subscribe({
      next: ride => {
        if(ride.driver){
          this.text = "Driver is on his way."
        }else{
          this.text = "The ride has been scheduled. You will get a confirmation notification, 30 minutes before ride."
        }
        this.loading = false;
      },
      error: err => {
        this.text = err.error.message;
        this.loading = false;
      }
    });
  }
}
