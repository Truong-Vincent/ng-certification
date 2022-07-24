import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherIconComponent } from '@shared-ui/weather-icon/weather-icon.component';
import { LocationService } from '@shared/services/location.service';
import { WeatherService } from '@shared/services/weather.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, WeatherIconComponent],
  providers: [WeatherService],

  selector: 'app-current-condition-list',
  templateUrl: './current-condition-list.component.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentConditionListComponent {
  readonly currentConditions$ = this.weatherService.currentConditions$;

  constructor(
    private readonly weatherService: WeatherService,
    private readonly locationService: LocationService
  ) {}

  removeLocation(zipcode: string) {
    this.locationService.removeLocation(zipcode);
  }

  trackByFn(_: number, item: { zip: string }) {
    return item.zip;
  }
}
