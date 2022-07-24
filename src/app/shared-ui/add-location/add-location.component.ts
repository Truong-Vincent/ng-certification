import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LongRunningButtonModule } from '@shared-ui/long-running-button/long-running-button.module';
import { LocationService } from '@shared/services/location.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, LongRunningButtonModule],

  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddLocationComponent {
  model: string = '';

  constructor(private service: LocationService) {}

  addLocation() {
    return new Observable((o) => {
      this.service.addLocation(this.model);
      this.model = '';

      setTimeout(() => {
        o.next();
        o.complete();
      }, 500);
    });
  }
}
