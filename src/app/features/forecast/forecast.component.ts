import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WeatherIconComponent } from '@shared-ui/weather-icon/weather-icon.component';
import { Forecast } from '@shared/models';
import { WeatherIconService } from '@shared/services/weather-icon.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, WeatherIconComponent],

  selector: 'app-forecast',
  templateUrl: './forecast.component.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastComponent implements OnInit {
  static readonly ROUTE_DATA_KEYS = {
    FORECAST: 'forecast',
  };

  city: string = '';
  forecast?: Forecast;

  constructor(
    private route: ActivatedRoute,
    private weatherIconService: WeatherIconService
  ) {}

  ngOnInit(): void {
    this.forecast = this.route.snapshot.data[
      ForecastComponent.ROUTE_DATA_KEYS.FORECAST
    ] as Forecast;
  }

  getWeatherIcon(weatherConditionId: number) {
    return this.weatherIconService.getWeatherIcon(weatherConditionId);
  }
}
