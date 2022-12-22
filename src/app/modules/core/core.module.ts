import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import { FooterComponent } from './components/footer/footer.component';
import {HistoryModule} from "../feature/history/history.module";
import {HomeModule} from "../feature/home/home.module";
import {AccountModule} from "../feature/account/account.module";
import {RideModule} from "../feature/ride/ride.module";
import {FavoritePathModule} from "../feature/favorite-path/favorite-path.module";

@NgModule({
  declarations: [
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    FooterComponent],
  exports: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HistoryModule,
    HomeModule,
    AccountModule,
    FavoritePathModule,
    RideModule
  ]
})
export class CoreModule {
}
