import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { HighlightDirective } from '@shared-ui/highlight/highlight.directive';
import { BehaviorSubject, filter, Subject, takeUntil } from 'rxjs';

type Item = string | number | object;
type SearchFn<T> = (term: string, item: T) => boolean;

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, HighlightDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectAutoCompleteComponent),
    },
  ],

  selector: 'app-select-autocomplete',
  templateUrl: './select-autocomplete.component.html',
  styleUrls: ['./select-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectAutoCompleteComponent<T extends Item>
  implements ControlValueAccessor, OnInit, OnDestroy
{
  disabled = false;

  private _items: T[] = [];
  @Input()
  set items(value: T[] | undefined) {
    this._items = value ? [...value] : [];
    this.search();
    this.handleWriteValue();
  }
  get items() {
    return this._items;
  }

  protected displayedItems: T[] = [];
  private selected?: T;
  protected get selectedLabel() {
    return this.selected ? this.getLabel(this.selected) : '';
  }

  protected searchTerm?: string;
  private ngModel?: unknown;

  protected isOpen$ = new BehaviorSubject<boolean>(false);

  @Input() bindValue?: PropertyKey;
  @Input() bindLabel: PropertyKey = 'label';
  @Input() searchFn: SearchFn<T> = this.defaultFilterFn;

  constructor(private eRef: ElementRef) {}

  private readonly ngDestroy$ = new Subject<void>();
  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  ngOnInit(): void {
    this.isOpen$
      .pipe(
        takeUntil(this.ngDestroy$),
        filter((isOpen) => !isOpen)
      )
      .subscribe(() => {
        this.searchTerm = undefined;
      });
  }

  /**
   * Open the dropdown and mark the element as touched
   * Used for the form
   */
  open(): void {
    if (!this.disabled) {
      this.isOpen$.next(true);
    }
  }

  /**
   * Filter the options depending on the input of the user
   * @param value
   */
  protected handleSearchChange(value: string): void {
    this.searchTerm = value;
    this.search();
  }

  private search() {
    const items = this._items;
    if (!items.length) {
      this.displayedItems = [];
    }

    const term = this.searchTerm;
    this.displayedItems =
      term == null || term == ''
        ? [...items]
        : items.filter((i) => this.searchFn(term, i));
  }

  select(value: T | null | undefined): void {
    this.selected = value || undefined;
    this.updateModel();
    this.isOpen$.next(false);
  }

  // #region ControlValueAccessor

  private updateModel() {
    const value = this.getValue(this.selected);
    this.onChange(value);
  }
  private handleWriteValue() {
    const ngModel = this.ngModel;
    this.selected =
      ngModel == null || ngModel !== ''
        ? this._items.find((item) => this.getValue(item) === ngModel)
        : undefined;
  }

  private onChange = (value: T | undefined) => {};
  private onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: unknown | null | undefined): void {
    this.ngModel = value;
    this.handleWriteValue();
  }

  // #endregion ControlValueAccessor

  /**
   * Listen for document click in order to know when we have clicked outside of the component
   * @param event
   */
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    this.isOpen$.next(this.eRef.nativeElement.contains(event.target));
  }
  @HostListener('focusout', ['$event'])
  blur(event: FocusEvent) {
    if (
      event.relatedTarget &&
      !this.eRef.nativeElement.contains(event.relatedTarget)
    ) {
      this.isOpen$.next(false);
    }
  }

  protected getLabel(item: T) {
    return typeof item === 'object' ? (item as any)[this.bindLabel] : item;
  }
  protected getValue(item: T | null | undefined) {
    const bindValue = this.bindValue;
    return !item ||
      typeof item !== 'object' ||
      bindValue == null ||
      bindValue === ''
      ? item
      : (item as any)[bindValue];
  }

  private defaultFilterFn(term: string, item: T): boolean {
    let label = this.getLabel(item);
    switch (typeof label) {
      case 'number':
      case 'string':
        return new RegExp(term, 'gmi').test(`${label}`);

      default:
        return false;
    }
  }
}
