import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-ride-pick-time',
  templateUrl: './ride-pick-time.component.html',
  styleUrls: ['./ride-pick-time.component.css']
})

export class RidePickTimeComponent {
  @Output() changeFormPageEmiter = new EventEmitter<number>();
  nextFormPage():void{
    this.changeFormPageEmiter.emit(1);
  }
  previousFormPage():void{
    this.changeFormPageEmiter.emit(-1);
  }
}
