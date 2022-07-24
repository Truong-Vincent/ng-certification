import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LetModule, PushModule } from '@ngrx/component';
import { LongRunningButtonComponent } from './long-running-button';
import {
  LongRuningButtonDoneTemplateDirective,
  LongRuningButtonReadyTemplateDirective,
  LongRuningButtonWorkingTemplateDirective,
} from './long-running-templates.directive';

export const exports = [
  // Directive templates
  LongRuningButtonReadyTemplateDirective,
  LongRuningButtonWorkingTemplateDirective,
  LongRuningButtonDoneTemplateDirective,

  // Component
  LongRunningButtonComponent,
];

@NgModule({
  declarations: [...exports],
  imports: [CommonModule, LetModule, PushModule],
  exports: exports,
})
export class LongRunningButtonModule {}
