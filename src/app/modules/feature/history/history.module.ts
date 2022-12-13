import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {HistoryComponent} from "./pages/history.component";
import {HistorySimplifiedCardComponent} from "./components/history-simplified-card/history-simplified-card.component";



@NgModule({
  declarations: [
    HistoryComponent,
    HistorySimplifiedCardComponent],
  imports: [
    SharedModule,
  ],
  exports:[
    HistoryComponent
  ]
})
export class HistoryModule { }
