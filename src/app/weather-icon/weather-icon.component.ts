import { Component, Input } from '@angular/core';
import { WeatherIconService } from '../core/services/weather-icon.service';

@Component({
  selector: 'app-weather-icon',
  template: `
    <img [ngClass]="{ icon: isIcon }" [src]="getWeatherIcon(condition)" />
  `,
})
export class WeatherIconComponent {
  @Input()
  condition: string = '';

  @Input()
  isIcon: boolean = false;

  constructor(private weatherIconService: WeatherIconService) {}

  getWeatherIcon(condition: string) {
    return this.weatherIconService.getIcon(condition);
  }
}
