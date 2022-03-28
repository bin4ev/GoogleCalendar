import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

const CUST_ATTR = 'curr-date'

@Directive({
  selector: '[appToolTip]'
})
export class ToolTipDirective {
  @Input('appToolTip') data!: any

  tooltip!: HTMLElement
  constructor(private renderer: Renderer2, private eleRef: ElementRef) { }

  ngOnInit() {
    this.tooltip = this.renderer.createElement('div')
    this.renderer.addClass (this.tooltip, 'toolTip')
    this.renderer.appendChild(this.eleRef.nativeElement, this.tooltip)
    this.tooltip.setAttribute(CUST_ATTR , this.data)
  }

  @HostListener('mouseover') hover() {
    this.tooltip.style.display = 'flex'
  }

  @HostListener('mouseout') out() {
    this.tooltip.style.display = 'none'
  }

}
