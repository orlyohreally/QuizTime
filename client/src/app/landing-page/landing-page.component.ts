import { Component, OnInit } from '@angular/core';

import { ModalService }         from '../modal.service';
import { ModalItem }            from '../modal-item';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  
  modal: ModalItem;
  constructor(private modalService: ModalService) { }
  
  ngOnInit() {
    
  }
  LoadLoginForm() {
    this.modal = this.modalService.getLoginFormModal();
  }
  getStepsModal() {
    this.modal = this.modalService.getStepsModal();
  }

}
