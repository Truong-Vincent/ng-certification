import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

const LOCATIONS_STORAGE_KEY: string = 'locations';

interface LocationChangeEvent {
  zipcode: string;
  type: 'new' | 'remove';
}

@Injectable({ providedIn: 'root' })
export class LocationService {
  private readonly locations: Set<string>;

  private readonly locationsSubject: Subject<ReadonlySet<string>>;
  readonly locations$: Observable<ReadonlySet<string>>;

  private readonly locationChange = new Subject<LocationChangeEvent>();
  readonly locationChange$ = this.locationChange.asObservable();

  constructor() {
    const locationArray = this.getLocationsFromStorage() || [];
    this.locations = new Set(locationArray);

    this.locationsSubject = new BehaviorSubject<ReadonlySet<string>>(
      this.locations
    );
    this.locations$ = this.locationsSubject.asObservable();
  }

  addLocation(zipcode: string) {
    if (this.locations.has(zipcode)) {
      this.locations.delete(zipcode);
    }

    this.locations.add(zipcode);
    this.locationChange.next({ zipcode, type: 'new' });
    this.onLocationsChanged();
  }

  removeLocation(zipcode: string) {
    if (this.locations.delete(zipcode)) {
      this.locationChange.next({ zipcode, type: 'remove' });
      this.onLocationsChanged();
    }
  }

  private onLocationsChanged() {
    this.saveToStorage();
    this.locationsSubject.next(this.locations);
  }

  private getLocationsFromStorage(): string[] | undefined {
    const locString = localStorage.getItem(LOCATIONS_STORAGE_KEY);

    const parsedLoc = locString && JSON.parse(locString);
    return Array.isArray(parsedLoc) ? parsedLoc : undefined;
  }

  private saveToStorage() {
    localStorage.setItem(
      LOCATIONS_STORAGE_KEY,
      JSON.stringify(Array.from(this.locations))
    );
  }
}
