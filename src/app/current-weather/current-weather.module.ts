import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrentWeatherRoutingModule } from './current-weather-routing.module';
import { CurrentWeatherComponent } from './current-weather.component';

@NgModule({
  declarations: [CurrentWeatherComponent],
  imports: [
    CommonModule,
    FormsModule,
    CurrentWeatherRoutingModule
  ],
})
export class CurrentWeatherModule {}
