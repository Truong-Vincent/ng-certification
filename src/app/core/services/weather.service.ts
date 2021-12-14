import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { WeatherLocation } from '../models';

const APP_ID = environment.openWeatherMapAppId;

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getByZipcode(zipcode: string) {
    const httpParams = new HttpParams()
      .set('zip', zipcode)
      .set('appid', APP_ID);
    return this.http.get<WeatherLocation>(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: httpParams,
      }
    );
  }
}
