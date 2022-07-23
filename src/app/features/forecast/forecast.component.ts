import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherIconComponent } from '@shared-ui/weather-icon/weather-icon.component';
import { Forecast, ForecastItems } from '@shared/models';
import { WeatherIconService } from '@shared/services/weather-icon.service';

@Component({
  standalone: true,
  imports: [CommonModule, WeatherIconComponent],

  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastComponent implements OnInit {
  static readonly ROUTE_DATA_KEYS = {
    FORECAST: 'forecast',
  };

  city: string = '';
  items!: ForecastItems;

  constructor(
    private route: ActivatedRoute,
    private weatherIconService: WeatherIconService
  ) {}

  ngOnInit(): void {
    const forecast = this.route.snapshot.data[
      ForecastComponent.ROUTE_DATA_KEYS.FORECAST
    ] as Forecast;

    this.city = forecast.city.name;
    this.items = forecast.list.filter((_, index) => index % 8 === 0);
  }

  getWeatherIcon(condition: string) {
    return this.weatherIconService.getIcon(condition);
  }
}
