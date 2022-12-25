import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {HistoryComponent} from "./pages/history.component";
import {HistorySimplifiedCardComponent} from "./components/history-simplified-card/history-simplified-card.component";
import { HistoryDetailedRideCardComponent } from './components/history-detailed-ride-card/history-detailed-ride-card.component';
import { HistoryReviewCardDriverComponent } from './components/history-review-card-driver/history-review-card-driver.component';
import { HistoryMapCardComponent } from './components/history-map-card/history-map-card.component';
import { HistoryDetailedDialogComponent } from './components/history-detailed-dialog/history-detailed-dialog.component';
import { HistoryReviewCardPassengerComponent } from './components/history-review-card-passenger/history-review-card-passenger.component';
import { HistorySearchParametersComponent } from './components/history-search-parameters/history-search-parameters.component';



@NgModule({
  declarations: [
    HistoryComponent,
    HistorySimplifiedCardComponent,
    HistoryDetailedRideCardComponent,
    HistoryReviewCardDriverComponent,
    HistoryMapCardComponent,
    HistoryDetailedDialogComponent,
    HistoryReviewCardPassengerComponent,
    HistorySearchParametersComponent],
  imports: [
    SharedModule,
  ],
  exports:[
    HistoryComponent],
})
export class HistoryModule { }
