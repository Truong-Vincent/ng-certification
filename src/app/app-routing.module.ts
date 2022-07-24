import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'forecast',
    loadChildren: () =>
      import('@features/forecast/forecast.module').then((m) => m.routes),
  },
  {
    path: '',
    loadChildren: () =>
      import('@features/main-page/main-page.module').then(
        (m) => m.routes
      ),
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
