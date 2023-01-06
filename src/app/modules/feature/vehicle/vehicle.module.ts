import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleChangeRequestsComponent } from './pages/vehicle-change-requests.component';
import { VehicleUpdateOverviewComponent } from './components/vehicle-update-overview/vehicle-update-overview.component';



@NgModule({
  declarations: [
    VehicleChangeRequestsComponent,
    VehicleUpdateOverviewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VehicleModule { }
