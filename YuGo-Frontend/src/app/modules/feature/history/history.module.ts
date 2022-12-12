import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../../../infrastructure/material.module";
import { HistorySimplifiedCardComponent } from './components/history-simplified-card/history-simplified-card.component';



@NgModule({
  declarations: [
    HistorySimplifiedCardComponent
  ],
  exports: [
    HistorySimplifiedCardComponent
  ],
  imports: [
    SharedModule,
    MaterialModule
  ]
})
export class HistoryModule { }
