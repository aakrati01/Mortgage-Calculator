import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { SummaryComponent } from './components/summary/summary.component';

import { HighchartsChartModule } from 'highcharts-angular';
import {ChartModule} from "angular-highcharts";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    AppRoutingModule,FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatSelectModule,HighchartsChartModule,ChartModule
  ],
  exports:[MatSliderModule, MatSelectModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
