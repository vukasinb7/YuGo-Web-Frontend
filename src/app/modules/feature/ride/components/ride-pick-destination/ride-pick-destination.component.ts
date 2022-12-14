import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-ride-pick-destination',
  templateUrl: './ride-pick-destination.component.html',
  styleUrls: ['./ride-pick-destination.component.css']
})
export class RidePickDestinationComponent {
  @Output() changeFormPageEvent = new EventEmitter<number>();
  nextFormPage():void {
    this.changeFormPageEvent.emit(1);
  }
}
