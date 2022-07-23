import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./current-weather.component').then(
        (m) => m.CurrentWeatherComponent
      ),
  },
];
