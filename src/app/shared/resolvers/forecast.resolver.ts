import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Forecast } from '../models';
import { WeatherService } from '../services/weather.service';

@Injectable({
  providedIn: 'root',
})
export class ForecastResolver implements Resolve<Forecast> {
  static readonly ROUTE_PARAM_KEYS = {
    ZIPCODE: 'zipcode',
  };

  constructor(private weatherService: WeatherService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Forecast | Observable<Forecast> | Promise<Forecast> {
    const zipcode = route.paramMap.get(
      ForecastResolver.ROUTE_PARAM_KEYS.ZIPCODE
    )!;
    return this.weatherService.getForecast(zipcode);
  }
}
