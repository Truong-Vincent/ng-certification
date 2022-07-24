import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PushModule } from '@ngrx/component';
import { LongRunningButtonModule } from '@shared-ui/long-running-button/long-running-button.module';
import { SelectAutoCompleteComponent } from '@shared-ui/select-autocomplete/select-autocomplete.component';
import { CountryService } from '@shared/services/country.service';
import { LocationService } from '@shared/services/location.service';
import { Observable } from 'rxjs';

interface LocationForm {
  country: FormControl<string>;
  zipcode: FormControl<string>;
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LongRunningButtonModule,
    SelectAutoCompleteComponent,

    PushModule,
  ],

  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddLocationComponent {
  protected readonly locationForm: FormGroup<LocationForm>;
  model: string = '';

  protected readonly countries$ = this.countryService.countries$;

  constructor(
    private readonly countryService: CountryService,
    private readonly locationService: LocationService,
    formbuilder: FormBuilder
  ) {
    this.locationForm = formbuilder.nonNullable.group({
      country: ['FR'],
      zipcode: ['', Validators.required],
    });
  }

  protected readonly addLocation = () => {
    return new Observable((o) => {
      const location = this.locationForm.value;
      this.locationService.addLocation(
        `${location.zipcode},${location.country}`
      );
      this.locationForm.reset();

      setTimeout(() => {
        o.next();
        o.complete();
      }, 500);
    });
  };
}
