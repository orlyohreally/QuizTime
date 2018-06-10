import { Component, OnInit } from '@angular/core';
//import * as $ from 'jquery';

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