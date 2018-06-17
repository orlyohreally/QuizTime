import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { ModalItem } from './modal-item';
import { ModalComponent } from './modal/modal.component';

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
    title = 'app';

    modal: ModalItem;
    authenticated: boolean;
    constructor() { 
        this.authenticated = this.IsAuthenticated();
    }
  
    ngOnInit() {
        this.modal = new ModalItem(null);
    }
    LoadComponentModal(component) {
        this.modal = new ModalItem(component);
    }

    CloseComponentModal() {
        this.modal = new ModalItem(null);
    }
    
    IsAuthenticated() {
        return localStorage.getItem('id_toke') != null;
    }
    LogIn(token: string) {
        localStorage.setItem('id_toke', token);
        this.authenticated = true;
    }
    LogOut() {
        localStorage.removeItem('id_toke');
        this.authenticated = false;
        console.log('logged out');
    }
    
}