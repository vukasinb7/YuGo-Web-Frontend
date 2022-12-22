import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import {CoreModule} from "./modules/core/core.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {SharedModule} from "./modules/shared/shared.module";
import {Interceptor} from "./modules/core/interceptors/interceptor.interceptor";


@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
      BrowserModule,
      CoreModule,
      SharedModule,
    ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
