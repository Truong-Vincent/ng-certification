import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  shareReplay,
  Subject,
  take,
  takeUntil,
  throttleTime,
} from 'rxjs';
import { WeatherLocation } from '../models';
import { LocationService } from './location.service';
import { OpenWeatherMapApi } from './open-weather-map-api';

@Injectable()
export class WeatherService implements OnDestroy {
  private weathers: { [zipcode: string]: WeatherLocation } = {};
  private weathers$ = new BehaviorSubject<{
    [zipcode: string]: WeatherLocation;
  }>({});
  readonly currentConditions$ = combineLatest([
    this.locationService.locations$,
    this.weathers$,
  ]).pipe(
    throttleTime(300, undefined, { leading: true, trailing: true }),
    map(([locations, weathers]) => {
      const currentConditions = [];
      for (const zip of locations) {
        currentConditions.push({ zip, data: weathers[zip] });
      }
      return currentConditions.reverse();
    }),
    shareReplay()
  );

  private readonly ngDestroy$ = new Subject<void>();
  constructor(
    private readonly locationService: LocationService,
    private readonly http: HttpClient
  ) {
    this.refreshWeathers();

    this.locationService.locationChange$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(({ type, zipcode }) => {
        switch (type) {
          case 'new':
            this.addCurrentCondition(zipcode);
            break;
          case 'remove':
            this.removeCurrentCondition(zipcode);
            break;
        }
      });
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  private refreshWeathers() {
    this.locationService.locations$
      .pipe(takeUntil(this.ngDestroy$), take(1))
      .subscribe((locations) => {
        this.weathers = {};
        for (const zipcode of new Set(locations)) {
          this.addCurrentCondition(zipcode);
        }
      });
  }

  addCurrentCondition(zipcode: string): void {
    this.getWeatherByZipcode(zipcode).subscribe((data) => {
      this.weathers[zipcode] = data;
      this.weathers$.next(this.weathers);
    });
  }

  private getWeatherByZipcode(zipcode: string) {
    const httpParams = new HttpParams()
      .set('zip', zipcode)
      .set('units', OpenWeatherMapApi.UNIT)
      .set('appid', OpenWeatherMapApi.APP_ID);

    return this.http.get<WeatherLocation>(`${OpenWeatherMapApi.URL}/weather`, {
      params: httpParams,
    });
  }

  removeCurrentCondition(zipcode: string) {
    delete this.weathers[zipcode];
    this.weathers$.next(this.weathers);
  }
}
