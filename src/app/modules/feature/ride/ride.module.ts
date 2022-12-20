import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {RideComponent} from "./pages/ride.component";
import {RidePickDestinationComponent} from "./components/ride-pick-destination/ride-pick-destination.component";
import { RidePickPropertiesComponent } from './components/ride-pick-properties/ride-pick-properties.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { VehicleTypeCardComponent } from './components/vehicle-type-card/vehicle-type-card.component';
import { RidePickTimeComponent } from './components/ride-pick-time/ride-pick-time.component';
import {NgxMatTimepickerModule} from "ngx-mat-timepicker";
import { RecommendedLocationComponent } from './components/recommended-location/recommended-location.component';

@NgModule({
  declarations: [
    RideComponent,
    RidePickDestinationComponent,
    RidePickPropertiesComponent,
    VehicleTypeCardComponent,
    RidePickTimeComponent,
    RecommendedLocationComponent],
  exports: [
    RideComponent,
  ],
  imports: [
    SharedModule,
    MatCheckboxModule,
    NgxMatTimepickerModule,
  ]
})
export class RideModule { }
