import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../infrastructure/app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './modules/feature/home/pages/home.component';
import { HistoryComponent } from './modules/feature/history/pages/history.component';
import {CoreModule} from "./modules/core/core.module";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HistoryComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
