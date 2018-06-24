import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { ModalItem } from './modal-item';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './modal.service';

import { Subscription } from 'rxjs';
@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
    title = 'app';
    subscription: Subscription;
    modal: ModalItem;
    constructor(private modalService: ModalService) { 
        this.modal = this.modalService.modal;
        this.subscription = this.modalService.modalChange.subscribe((value)=>{
            this.modal = value;
        });
    }
    LoadComponentModal(component) {
        this.modalService.LoadComponentModal(component);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    ngOnInit() {
    }
    
    CloseComponentModal() {
        this.modalService.LoadComponentModal(null);
    }
}