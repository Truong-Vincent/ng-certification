import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./main-page.component').then(
        (m) => m.MainPageComponent
      ),
  },
];
