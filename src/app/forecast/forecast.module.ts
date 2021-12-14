import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForecastRoutingModule } from './forecast-routing.module';
import { ForecastComponent } from './forecast.component';
import { WeatherIconModule } from '../weather-icon/weather-icon.module';


@NgModule({
  declarations: [
    ForecastComponent
  ],
  imports: [
    CommonModule,
    ForecastRoutingModule,

    WeatherIconModule
  ]
})
export class ForecastModule { }
