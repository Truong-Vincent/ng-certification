import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WeatherIconService } from '@shared/services/weather-icon.service';

@Component({
  standalone: true,
  imports: [CommonModule],

  selector: 'app-weather-icon',
  template: `
    <img
      [ngClass]="{ icon: isIcon }"
      [src]="weatherIcon"
      alt="{{ conditionId }}"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherIconComponent {
  @Input() conditionId?: number;
  @Input() isIcon: boolean = false;

  get weatherIcon() {
    return this.conditionId
      ? this.weatherIconService.getWeatherIcon(this.conditionId)
      : undefined;
  }

  constructor(private weatherIconService: WeatherIconService) {}
}
