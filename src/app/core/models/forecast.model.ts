import { Clouds, Coord, Main, Weather, Wind } from "./weather.model";


export interface Rain {
  "3h": number;
}

export interface ForecastItem {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain: Rain;
  dt_txt: string;
}
export type ForecastItems = ForecastItem[];


export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface Forecast {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: City;
}
