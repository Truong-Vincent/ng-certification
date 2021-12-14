import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastResolver } from '../core/resolvers/forecast.resolver';
import { ForecastComponent } from './forecast.component';

const routes: Routes = [
  {
    path: `:${ForecastResolver.ROUTE_PARAM_KEYS.ZIPCODE}`,
    component: ForecastComponent,
    resolve: { [ForecastComponent.ROUTE_DATA_KEYS.FORECAST]: ForecastResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForecastRoutingModule {}
