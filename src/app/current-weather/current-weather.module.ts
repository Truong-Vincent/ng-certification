import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherIconModule } from '../weather-icon/weather-icon.module';
import { CurrentWeatherRoutingModule } from './current-weather-routing.module';
import { CurrentWeatherComponent } from './current-weather.component';

@NgModule({
  declarations: [CurrentWeatherComponent],
  imports: [CommonModule, FormsModule, CurrentWeatherRoutingModule, WeatherIconModule],
})
export class CurrentWeatherModule {}
