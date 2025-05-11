import { Renderer2 } from '@angular/core';
import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';

@Directive({
  selector: '[appFormErrorTooltip]'
})
export class FormErrorTooltipDirective {

  constructor(private control: NgControl, private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    this.control.valueChanges.subscribe(() => {
      const controlErrors = this.control.errors;
      if (this.control.invalid && this.control.touched) {
        this.el.nativeElement.classList.add('has-error');
        //this.renderer.addClass(this.el, 'has-error');
      } else {
        this.el.nativeElement.classList.remove('has-error');
      }
    });
  }
}

