import { Injectable } from '@angular/core';
import { Countries } from '@shared/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly countries = new BehaviorSubject<Countries>([]);
  readonly countries$ = this.countries.asObservable();

  constructor() {
    fetch('./assets/countries.json')
      .then<Countries>((res) => res.json())
      .then((jsonData) => {
        this.countries.next(jsonData);
      });
  }
}
