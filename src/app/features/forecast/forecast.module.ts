import { Routes } from '@angular/router';
import { ForecastResolver } from '@shared/resolvers/forecast.resolver';
import { ForecastComponent } from './forecast.component';

export const routes: Routes = [
  {
    path: `:${ForecastResolver.ROUTE_PARAM_KEYS.ZIPCODE}`,
    component: ForecastComponent,
    resolve: { [ForecastComponent.ROUTE_DATA_KEYS.FORECAST]: ForecastResolver },
  },
];
