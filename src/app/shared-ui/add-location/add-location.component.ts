import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocationService } from '@shared/services/location.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],

  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddLocationComponent {
  model: string = '';

  constructor(private service: LocationService) {}

  addLocation() {
    this.service.addLocation(this.model);
    this.model = '';
  }
}
