import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  standalone: true,

  selector: '[appHighlight]',
})
export class HighlightDirective implements OnChanges, AfterViewInit {
  @Input('appHighlight') searchTerm?: string;

  label?: string;

  private readonly element: HTMLElement;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2
  ) {
    this.element = this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.label = this.element.innerHTML;
  }

  ngOnChanges(changes: SimpleChanges) {
    const label = this.label ?? '';
    if (label == null || label === '') {
      return;
    }
    if ('searchTerm' in changes) {
      const searchTerm = changes['searchTerm'].currentValue;
      if (searchTerm == null || searchTerm === '') {
        this.setInnerHtml(label);
        return;
      }
      const regex = new RegExp(searchTerm, 'gi');
      this.setInnerHtml(
        label.replace(regex, (match: string) => `<b>${match}</b>`)
      );
    }
  }

  private setInnerHtml(html: string) {
    this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', html);
  }
}
