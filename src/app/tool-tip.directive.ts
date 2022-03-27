import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appToolTip]'
})
export class ToolTipDirective {
@Input('appToolTip') data!: any
CUST_ATTR = 'cust-attr'

  constructor(private renderer: Renderer2, private eleRef: ElementRef ) { }

  @HostListener('mouseover') hover() {
    this.renderer.setAttribute(this.eleRef.nativeElement ,this.CUST_ATTR, this.data)
  }
}
