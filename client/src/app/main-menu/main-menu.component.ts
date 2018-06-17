import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { LoginFormComponent } from '../login-form/login-form.component';

import { AppComponent } from '../app.component';


@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css'],
    host: {
        '(window:resize)': 'onResize($event)'
    }
})
export class MainMenuComponent implements OnInit {
    collapsed: boolean;
    constructor(private modalService: ModalService, private appComponent: AppComponent) {}

    ngOnInit() {
        this.collapsed = false;
    }
    onResize(event) {
        console.log(event, event.target.innerWidth);
        if(event.target.innerWidth > 768)
            this.collapsed = false;
    }
    toggleMobileMenu() {
        this.collapsed = !this.collapsed;
    }
    ShowLoginForm() {
        this.collapsed = false;
        this.appComponent.LoadComponentModal(LoginFormComponent);
    }
    
    CloseLoginForm() {
        this.appComponent.CloseComponentModal();
    }
    LogOut() {
        this.appComponent.LogOut();
        console.log('logging out');
    }
}
