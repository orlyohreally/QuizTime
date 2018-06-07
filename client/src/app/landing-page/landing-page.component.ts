import { Component, OnInit, Input } from '@angular/core';

import { ModalService }         from '../modal.service';
import { ModalItem }            from '../modal-item';
import { StepsComponent } from '../steps/steps.component';
import { ModalComponent } from '../modal/modal.component';

import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  modal: ModalItem;
  constructor(private modalService: ModalService) { }
  
  ngOnInit() {
    console.log('hey');
    this.modal = new ModalItem(null, {});
    //this.modalComponent.modal = new ModalItem(LoginFormComponent, {login:"ddvdv"});
    //this.modalComponent.active = false;
    
    
    //this.modal = new ModalItem(LoginFormComponent, {login:"init"});
  }
  
  LoadLoginForm(data) {
    this.modal = new ModalItem(LoginFormComponent, {login:"onclick"});
  }
  CloseLoginForm() {
    this.modal = new ModalItem(null, {});
  }
  

}
