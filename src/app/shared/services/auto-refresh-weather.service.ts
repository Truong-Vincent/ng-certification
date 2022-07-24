import { Injectable, OnDestroy } from '@angular/core';
import { interval, skip, Subscription } from 'rxjs';
import { WeatherService } from './weather.service';

@Injectable()
export class AutoRefreshWeatherService implements OnDestroy {
  private intervalSubscriber?: Subscription;

  constructor(private weatherService: WeatherService) {}

  ngOnDestroy(): void {
    this.unsubscribeInterval();
  }

  init(intervalMs: number = 30000) {
    this.unsubscribeInterval();
    this.intervalSubscriber = interval(intervalMs)
      .pipe(skip(1))
      .subscribe(() => this.weatherService.refreshAll());
  }

  private unsubscribeInterval() {
    if (this.intervalSubscriber) {
      this.intervalSubscriber.unsubscribe();
    }
  }
}
