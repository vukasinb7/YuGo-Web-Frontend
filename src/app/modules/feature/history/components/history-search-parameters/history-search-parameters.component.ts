import { Component } from '@angular/core';

@Component({
  selector: 'app-history-search-parameters',
  templateUrl: './history-search-parameters.component.html',
  styleUrls: ['./history-search-parameters.component.css']
})
export class HistorySearchParametersComponent {
  selected: any;
  constructor() {
    this.selected="date";
  }

}
