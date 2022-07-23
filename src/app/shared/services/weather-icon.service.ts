import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherIconService {
  constructor() {}

  getIcon(condition: string): string {
    return `https://www.angulartraining.com/images/weather/${condition.toLowerCase()}.png`;
  }
}
