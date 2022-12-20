import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {HomeComponent} from "./pages/home.component";
import {RideModule} from "../ride/ride.module";
import { MapComponent } from './components/map/map.component';



@NgModule({
  declarations: [
    HomeComponent,
    MapComponent],
  imports: [
    SharedModule,
    RideModule
  ]
})
export class HomeModule { }
