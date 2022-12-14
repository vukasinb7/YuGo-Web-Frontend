import { Component } from '@angular/core';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent {
  formPageIndex: number = 0;
  switchFormPage(switchDirection:number){
    this.formPageIndex += switchDirection;
  }
}
