// import {
//   Directive,
//   ElementRef,
//   HostBinding,
//   Input,
//   OnChanges,
//   SimpleChanges,
// } from '@angular/core';

// @Directive({
//   selector: '[appHighlight]',
// })
// export class HighlightDirective implements OnChanges {
//   @Input('appHighlight') searchTerm?: string;

//   currentValue: string;

//   @HostBinding('innerHtml') content?: string;

//   private readonly element: HTMLElement;

//   constructor(private elementRef: ElementRef) {
//     this.element = this.elementRef.nativeElement;
//     this.element.inn
//   }

//   ngOnChanges(changes: SimpleChanges) {
//     if (!this.elementRef?.nativeElement) {
//       return;
//     }
//     if ('searchTerm' in changes) {
//       if (!this.searchTerm || this.searchTerm === '') {
//         this.content = this.currentValue;
//       } else {
//         const regex = new RegExp(this.searchTerm, 'gi');
//         const newText = this.currentValue.replace(regex, (match: string) => {
//           return `<b>${match}</b>`;
//         });
//         this.content = newText;
//       }
//     }
//   }

//   private highlightContent() {
//     const label = this.content;
//     if (!this.searchTerm) {
//       this._setInnerHtml(label);
//       return;
//     }

//     const alternationString = this._escapeRegExp(this.term).replace(' ', '|');
//     const termRegex = new RegExp(alternationString, 'gi');
//     this._setInnerHtml(
//       label.replace(termRegex, `<span class=\"highlighted\">$&</span>`)
//     );
//   }
// }
