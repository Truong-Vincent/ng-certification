import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WeatherIconService } from '@shared/services/weather-icon.service';

@Component({
  standalone: true,
  imports: [CommonModule],

  selector: 'app-weather-icon',
  template: `
    <img [ngClass]="{ icon: isIcon }" [src]="getWeatherIcon(condition)" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherIconComponent {
  @Input() condition: string = '';
  @Input() isIcon: boolean = false;

  constructor(private weatherIconService: WeatherIconService) {}

  getWeatherIcon(condition: string) {
    return this.weatherIconService.getIcon(condition);
  }
}
