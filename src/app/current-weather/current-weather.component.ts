import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentWeatherComponent implements OnInit {

  inputZipcode: string = '';

  zipcodes: string[] = []

  constructor() { }

  ngOnInit(): void {
  }

  addLocation(zipcode: string){
    this.zipcodes.push(zipcode);
  }
}
