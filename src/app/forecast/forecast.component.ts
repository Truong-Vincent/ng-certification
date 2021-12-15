import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Forecast, ForecastItems } from '../core/models';
import { WeatherIconService } from '../core/services/weather-icon.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
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
