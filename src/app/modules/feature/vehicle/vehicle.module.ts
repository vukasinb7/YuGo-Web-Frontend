import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleChangeRequestsComponent } from './pages/vehicle-change-requests.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    VehicleChangeRequestsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    VehicleChangeRequestsComponent
  ]
})
export class VehicleModule { }
