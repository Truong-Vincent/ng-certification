import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'forecast', loadChildren: () => import('./forecast/forecast.module').then(m => m.ForecastModule) },
  {
    path: '',
    loadChildren: () =>
      import('./current-weather/current-weather.module').then(
        (m) => m.CurrentWeatherModule
      ),
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
