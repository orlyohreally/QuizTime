import { Injectable } from '@angular/core';

import { LoginFormComponent } from './login-form/login-form.component';
import { ModalItem } from './modal-item';

@Injectable()
export class ModalService {

  getAds() {
    return [
      new ModalItem(LoginFormComponent,   {user: 'Hiring for several positions',
                                        password: 'Submit your resume today!'}),

      new ModalItem(LoginFormComponent,   {user: 'Openings in all departments',
                                        password: 'Apply today'}),
    ];
  }
  
}