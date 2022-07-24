import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  defaultIfEmpty,
  EMPTY,
  filter,
  fromEvent,
  last,
  map,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import {
  LongRuningButtonDoneTemplateDirective,
  LongRuningButtonReadyTemplateDirective,
  LongRuningButtonWorkingTemplateDirective,
} from './long-running-templates.directive';

enum LongRunningButtonState {
  Ready = 'READY',
  Working = 'WORKING',
  Done = 'DONE',
}

@Component({
  selector: 'app-long-running-button',
  templateUrl: './long-running-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LongRunningButtonComponent<T> implements OnDestroy, AfterViewInit {
  private readonly ngDestroy$ = new Subject<void>();

  // Templates
  @ContentChild(LongRuningButtonReadyTemplateDirective)
  readyTemplate?: LongRuningButtonReadyTemplateDirective;
  @ContentChild(LongRuningButtonWorkingTemplateDirective)
  workingTemplate?: LongRuningButtonWorkingTemplateDirective;
  @ContentChild(LongRuningButtonDoneTemplateDirective)
  doneTemplate?: LongRuningButtonDoneTemplateDirective;

  @ViewChild('longRunningButton', { static: true })
  longRunningButton?: ElementRef;

  @Input() type: string = 'button';
  @Input() clickAction$?: Observable<T>;
  @Input() canExecute: boolean = true;

  readonly LongRunningButtonState = LongRunningButtonState;
  readonly state$ = new BehaviorSubject<LongRunningButtonState>(
    LongRunningButtonState.Ready
  );

  readonly disabled$ = this.state$.pipe(
    map((state) => state !== LongRunningButtonState.Ready)
  );
  readonly btnNgClass$ = this.state$.pipe(
    map((state) => this.getButtonCss(state))
  );

  ngAfterViewInit(): void {
    if (!this.longRunningButton) {
      throw new Error('longRunningButton not exists.');
    }

    fromEvent(this.longRunningButton.nativeElement, 'click')
      .pipe(
        takeUntil(this.ngDestroy$),
        withLatestFrom(this.state$),
        filter(
          ([_, state]) =>
            this.canExecute === true && state === LongRunningButtonState.Ready
        ),
        tap(() => this.state$.next(LongRunningButtonState.Working)),
        switchMap(() =>
          (this.clickAction$ ?? EMPTY).pipe(
            last(),
            catchError(() => EMPTY),
            defaultIfEmpty(undefined)
          )
        ),
        takeUntil(this.ngDestroy$)
      )
      .subscribe(() => {
        this.state$.next(LongRunningButtonState.Done);
        setTimeout(() => this.state$.next(LongRunningButtonState.Ready), 500);
      });
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  getTemplateDirective(state: LongRunningButtonState) {
    switch (state) {
      case LongRunningButtonState.Ready:
        return this.readyTemplate;
      case LongRunningButtonState.Working:
        return this.workingTemplate;
      case LongRunningButtonState.Done:
        return this.doneTemplate;
      default:
        return undefined;
    }
  }

  private getButtonCss(state: LongRunningButtonState) {
    const directive = this.getTemplateDirective(state);
    if (directive && directive.btnClass != null) {
      return directive.btnClass;
    }
    // Defailt css class
    switch (state) {
      case LongRunningButtonState.Ready:
        return 'btn-primary';
      case LongRunningButtonState.Working:
        return 'btn-warning';
      case LongRunningButtonState.Done:
        return 'btn-success';
      default:
        return undefined;
    }
  }
}
