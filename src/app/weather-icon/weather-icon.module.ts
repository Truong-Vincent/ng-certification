import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherIconComponent } from './weather-icon.component';

@NgModule({
  declarations: [
    WeatherIconComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[WeatherIconComponent]
})
export class WeatherIconModule { }
