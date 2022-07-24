import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddLocationComponent } from '@shared-ui/add-location/add-location.component';
import { CurrentConditionListComponent } from '@shared-ui/current-condition-list/current-condition-list.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AddLocationComponent,
    CurrentConditionListComponent,
  ],

  templateUrl: './main-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {}
