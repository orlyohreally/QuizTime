import { Injectable } from '@angular/core';

import { LoginFormComponent } from './login-form/login-form.component';
import { StepsComponent } from './steps/steps.component';
import { ModalItem } from './modal-item';

@Injectable()
export class ModalService {

  getLoginFormModal() {
    return new ModalItem(LoginFormComponent,   {user: 'Hiring for several positions',
                                        password: 'Submit your resume today!'});
  }
  
}