import { Component, OnInit, Input } from '@angular/core';

import { ModalItem }            from '../modal-item';
import { StepsComponent } from '../steps/steps.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  modal: ModalItem;
  constructor() { }
  
  ngOnInit() {
    this.modal = new ModalItem(null);
  }
  LoadComponentModal(component) {
    this.modal = new ModalItem(component);
  }
  
  CloseComponentModal() {
    this.modal = new ModalItem(null);
  }
  
}
