import { Injectable } from '@angular/core';
import { ModalItem } from './modal-item';
import { Subject } from 'rxjs';

@Injectable()
export class ModalService {
    modal: ModalItem;
    constructor() { 
        this.modal = new ModalItem(null);;
    }
    modalChange: Subject<ModalItem> = new Subject<ModalItem>();
    LoadComponentModal(component) {
        console.log('service load component', component);
        this.modal = new ModalItem(component);
        this.modalChange.next(this.modal);
    }
}