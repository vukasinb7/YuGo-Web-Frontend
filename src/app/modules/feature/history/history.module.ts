import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {HistoryComponent} from "./pages/history.component";
import {HistorySimplifiedCardComponent} from "./components/history-simplified-card/history-simplified-card.component";
import { HistoryDetailedRideCardComponent } from './components/history-detailed-ride-card/history-detailed-ride-card.component';
import { HistoryReviewCardDriverComponent } from './components/history-review-card-driver/history-review-card-driver.component';



@NgModule({
  declarations: [
    HistoryComponent,
    HistorySimplifiedCardComponent,
    HistoryDetailedRideCardComponent,
    HistoryReviewCardDriverComponent],
  imports: [
    SharedModule,
  ],
  exports:[
    HistoryComponent],
})
export class HistoryModule { }
