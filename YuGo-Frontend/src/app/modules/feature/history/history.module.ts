import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import { HistorySimplifiedCardComponent } from './components/history-simplified-card/history-simplified-card.component';
import {MatCardModule} from "@angular/material/card";
import {MaterialModule} from "../../../../infrastructure/material.module";



@NgModule({
  declarations: [
    HistorySimplifiedCardComponent
  ],
  exports: [
    HistorySimplifiedCardComponent
  ],
  imports: [
    SharedModule,
    MatCardModule,
    MaterialModule,
  ]
})
export class HistoryModule { }
