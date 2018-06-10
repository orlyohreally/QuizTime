import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy, SimpleChanges } from '@angular/core';

import { ModalDirective } from '../modal.directive';
import { ModalItem }      from '../modal-item';
import { ModalContentComponent } from '../modal-content.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() modal: ModalItem;
  @ViewChild(ModalDirective) modalContentHost: ModalDirective;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
  }
  ngOnChanges(changes:SimpleChanges) {
    this.loadComponent();
  }
  Close() {
    this.modal = new ModalItem(null);
  }
  loadComponent() {
    if(this.modal && this.modal.component) {
        let modalItem = this.modal;
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(modalItem.component);
        let viewContainerRef = this.modalContentHost.viewContainerRef;
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<ModalContentComponent>componentRef.instance).data = modalItem.data;
    }
    else {
        let viewContainerRef = this.modalContentHost.viewContainerRef;
        viewContainerRef.clear();
    }
  }

}