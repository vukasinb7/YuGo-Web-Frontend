import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {HistoryComponent} from "./pages/history.component";



@NgModule({
  declarations: [
    HistoryComponent],
  imports: [
    SharedModule
  ]
})
export class HistoryModule { }
