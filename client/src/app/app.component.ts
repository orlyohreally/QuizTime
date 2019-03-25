import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';

import { ModalItem } from './modal-item';
import { ModalService } from './modal.service';

import { Subscription } from 'rxjs';
@Component({
	selector: 'body',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
	title = 'app';
	subscription: Subscription;
	modal: ModalItem;
	constructor(private modalService: ModalService) {
		this.modal = this.modalService.modal;
		this.subscription = this.modalService.modalChange.subscribe(value => {
			this.modal = value;
		});
	}
	LoadComponentModal(component, data = {}) {
		this.modalService.LoadComponentModal(component, data);
	}
	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
	ngOnInit() {}

	CloseComponentModal() {
		this.modalService.LoadComponentModal(null);
	}
}
