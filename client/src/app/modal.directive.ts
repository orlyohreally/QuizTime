import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[modal-content-host]'
})
export class ModalDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}