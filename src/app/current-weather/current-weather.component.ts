import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import { WeatherLocation } from '../core/models';
import { WeatherIconService } from '../core/services/weather-icon.service';
import { WeatherService } from '../core/services/weather.service';

type WeatherLocationWithZipcode = WeatherLocation & { zipcode: string };
const WEATHER_LOCAL_STORAGE_KEY = 'current_weather';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherComponent implements OnDestroy, OnInit {
  inputZipcode: string = '';

  readonly weathers: Array<WeatherLocationWithZipcode> = [];

  private readonly ngDestroy = new Subject<void>();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private weatherService: WeatherService,
    private weatherIconService: WeatherIconService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.retoreFromLocalStorage();
  }

  ngOnDestroy(): void {
    this.ngDestroy.next();
    this.ngDestroy.complete();
  }

  addLocation(zipcode: string) {
    this.addWeather(zipcode)
      .pipe(
        catchError((err: { error: { cod: string; message: string } }) => {
          this.toastrService.warning(err.error.message);
          return EMPTY;
        })
      )
      .subscribe((weather) => {
        this.weathers.push({ ...weather, zipcode });
        this.inputZipcode = '';
        this.changeDetectorRef.markForCheck();
        this.saveToLocalStorage();
      });
  }

  addWeather(zipcode: string) {
    return this.weatherService
      .getByZipcode(zipcode)
      .pipe(takeUntil(this.ngDestroy));
  }

  getWeatherIcon(condition: string) {
    return this.weatherIconService.getIcon(condition);
  }

  removeLocation(item: WeatherLocationWithZipcode) {
    const index = this.weathers.indexOf(item);
    if (index > -1) {
      this.weathers.splice(index, 1);
      this.changeDetectorRef.markForCheck();
      this.saveToLocalStorage();
    }
  }

  saveToLocalStorage() {
    localStorage.setItem(
      WEATHER_LOCAL_STORAGE_KEY,
      JSON.stringify(this.weathers)
    );
  }

  retoreFromLocalStorage() {
    const serializedItem = localStorage.getItem(WEATHER_LOCAL_STORAGE_KEY);
    if (serializedItem) {
      const weathers = JSON.parse(serializedItem);
      if (Array.isArray(weathers)) {
        this.weathers.push(...weathers);
      }
    }
  }
}
