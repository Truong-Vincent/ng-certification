import { Directive, Input, TemplateRef } from '@angular/core';

@Directive()
abstract class LongRuningButtonTemplateDirective {
  @Input() btnClass?: string | [string];
}

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[lrb-ready-tmp]' })
export class LongRuningButtonReadyTemplateDirective extends LongRuningButtonTemplateDirective {
  constructor(public template: TemplateRef<any>) {
    super();
  }
}

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[lrb-working-tmp]' })
export class LongRuningButtonWorkingTemplateDirective extends LongRuningButtonTemplateDirective {
  constructor(public template: TemplateRef<any>) {
    super();
  }
}

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[lrb-done-tmp]' })
export class LongRuningButtonDoneTemplateDirective extends LongRuningButtonTemplateDirective {
  constructor(public template: TemplateRef<any>) {
    super();
  }
}
