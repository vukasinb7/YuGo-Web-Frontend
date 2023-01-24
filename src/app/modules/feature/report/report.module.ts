import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {ReportComponent} from "./pages/report.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ChartModule} from 'primeng/chart';


@NgModule({
  declarations: [
  ReportComponent,


  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ChartModule
  ],
  exports:[
    ReportComponent
    ],
})
export class ReportModule { }
