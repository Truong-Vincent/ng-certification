import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  shareReplay,
  Subject,
  take,
  takeUntil,
  throttleTime,
} from 'rxjs';
import { WeatherLocation } from '../models';
import { LocationService } from './location.service';
import { OpenWeatherMapApi } from './open-weather-map-api';

type CurrentWeather =
  | {
      data: WeatherLocation;
      lastUpdate: Date;
      error?: never;
    }
  | {
      data?: never;
      lastUpdate: Date;
      error: string;
    };

type CurrentCondition = CurrentWeather & {
  zip: string;
};

@Injectable({ providedIn: 'root' })
export class WeatherService implements OnDestroy {
  private weathers: {
    [zipcode: string]: CurrentWeather;
  } = {};
  private readonly weathers$ = new BehaviorSubject<WeatherService['weathers']>(
    {}
  );

  readonly currentConditions$: Observable<CurrentCondition[]>;

  private readonly ngDestroy$ = new Subject<void>();

  constructor(
    private readonly locationService: LocationService,
    private readonly http: HttpClient
  ) {
    this.refreshAll();

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

    this.currentConditions$ = combineLatest([
      this.locationService.locations$,
      this.weathers$,
    ]).pipe(
      throttleTime(300, undefined, { leading: true, trailing: true }),
      map(([locations, weathers]) => {
        const currentConditions: CurrentCondition[] = [];
        for (const zip of locations) {
          currentConditions.push({
            ...weathers[zip],
            zip,
          });
        }
        return currentConditions.reverse();
      }),
      shareReplay()
    );
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  refreshAll() {
    this.locationService.locations$
      .pipe(takeUntil(this.ngDestroy$), take(1))
      .subscribe((locations) => {
        for (const zipcode of new Set(locations)) {
          this.addCurrentCondition(zipcode);
        }
      });
  }

  addCurrentCondition(zipcode: string): void {
    this.getWeatherByZipcode(zipcode).subscribe({
      next: (data) => {
        this.weathers[zipcode] = { data, lastUpdate: new Date() };
        this.weathers$.next(this.weathers);
      },
      error: (error) => {
        this.weathers[zipcode] = {
          error: error.error?.message,
          lastUpdate: new Date(),
        };
        this.weathers$.next(this.weathers);
      },
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
