import {Component, Input} from '@angular/core';
import {Panic} from "../../models/Panic";

@Component({
  selector: 'app-panic-card',
  templateUrl: './panic-card.component.html',
  styleUrls: ['./panic-card.component.css']
})
export class PanicCardComponent {
  @Input()
  public panic! : Panic;
  @Input()
  public notification! : boolean;
  constructor() {

  }
}
