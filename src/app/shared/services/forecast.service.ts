import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Forecast } from '../models';
import { OpenWeatherMapApi } from './open-weather-map-api';

@Injectable({ providedIn: 'root' })
export class ForecastService {
  constructor(private readonly http: HttpClient) {}

  getForecast(zipcode: string) {
    const httpParams = new HttpParams()
      .set('zip', zipcode)
      .set('units', OpenWeatherMapApi.UNIT)
      .set('cnt', 5) // Take 5 days
      .set('appid', OpenWeatherMapApi.APP_ID);

    return this.http.get<Forecast>(`${OpenWeatherMapApi.URL}/forecast/daily`, {
      params: httpParams,
    });
  }
}
