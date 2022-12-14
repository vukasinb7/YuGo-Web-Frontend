import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {HomeComponent} from "./pages/home.component";
import {RideModule} from "../ride/ride.module";



@NgModule({
  declarations: [
    HomeComponent],
  imports: [
    SharedModule,
    RideModule
  ]
})
export class HomeModule { }
