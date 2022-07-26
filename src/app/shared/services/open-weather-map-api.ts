import { environment } from '@environments/environment';

export class OpenWeatherMapApi {
  static readonly UNIT = 'metric';
  static readonly APP_ID = environment.openWeatherMapAppId;
  static readonly URL = 'https://api.openweathermap.org/data/2.5';
}
