import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { ForecastService } from '@shared/services/forecast.service';
import { Observable } from 'rxjs';
import { Forecast } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ForecastResolver implements Resolve<Forecast> {
  static readonly ROUTE_PARAM_KEYS = {
    ZIPCODE: 'zipcode',
  };

  constructor(private readonly service: ForecastService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Forecast | Observable<Forecast> | Promise<Forecast> {
    const zipcode = route.paramMap.get(
      ForecastResolver.ROUTE_PARAM_KEYS.ZIPCODE
    )!;
    return this.service.getForecast(zipcode);
  }
}
