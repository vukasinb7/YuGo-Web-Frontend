import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-ride-pick-time',
  templateUrl: './ride-pick-time.component.html',
  styleUrls: ['./ride-pick-time.component.css']
})

export class RidePickTimeComponent {
  @Output() changeFormPageEmitter = new EventEmitter<number>();
  nextFormPage():void{
    this.changeFormPageEmitter.emit(1);
  }
  previousFormPage():void{
    this.changeFormPageEmitter.emit(-1);
  }
}
