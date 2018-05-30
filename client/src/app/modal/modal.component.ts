import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';

import { ModalDirective } from '../modal.directive';
import { ModalItem }      from '../modal-item';
import { ModalContentComponent } from '../modal-content.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() ads: ModalItem[];
  currentAdIndex = -1;
  @ViewChild(ModalDirective) adHost: ModalDirective;
  interval: any;
  
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    let modalItem = this.ads[this.currentAdIndex];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(modalItem.component);

    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<ModalContentComponent>componentRef.instance).data = modalItem.data;
  }

  getAds() {
    //this.interval = setInterval(() => {
      this.loadComponent();
    //}, 3000);
  }

}