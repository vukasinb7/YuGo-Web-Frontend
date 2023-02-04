import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MaterialModule} from "../../../infrastructure/material.module";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "../../../infrastructure/app-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import { ImagePreviewComponent } from './components/image-preview/image-preview.component';

@NgModule({
  declarations: [
    ImagePreviewComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    BrowserModule
  ],
    exports: [
        CommonModule,
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserModule
    ]
})
export class SharedModule {}
