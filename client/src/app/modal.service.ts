import { Injectable } from '@angular/core';

import { LoginFormComponent } from './login-form/login-form.component';
import { StepsComponent } from './steps/steps.component';
import { ModalItem } from './modal-item';

@Injectable()
export class ModalService {

  getLoginFormModal(data) {
    return new ModalItem(LoginFormComponent, data);
  }
  
}