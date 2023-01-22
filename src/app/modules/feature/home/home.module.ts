import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {HomeComponent} from "./pages/home.component";
import {RideModule} from "../ride/ride.module";
import { PassengerMapComponent } from './components/passenger-map/passenger-map.component';
import {DriverMapComponent} from "./components/driver-map/driver-map.component";
import { AdminMapComponent } from './components/admin-map/admin-map.component';



@NgModule({
  declarations: [
    HomeComponent,
    PassengerMapComponent,
    DriverMapComponent,
    AdminMapComponent],
  imports: [
    SharedModule,
    RideModule
  ]
})
export class HomeModule { }
