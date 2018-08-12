import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { LoginFormComponent } from '../login-form/login-form.component';

import { AuthService } from '../auth.service';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css'],
    host: {
        '(window:resize)': 'OnResize($event)'
    }
})
export class MainMenuComponent implements OnInit {
    collapsed: boolean;
    constructor(private modalService: ModalService, private authService: AuthService) {}
    profile_collapsed:boolean;
    ngOnInit() {
        this.collapsed = false;
        this.profile_collapsed = true;
    }
    OnResize(event) {
        if(event.target.innerWidth > 768)
            this.collapsed = false;
    }
    
    ToggleMobileMenu() {
        this.collapsed = !this.collapsed;
    }
    ShowLoginForm() {
        this.collapsed = false;        
        this.profile_collapsed = true;
        this.modalService.LoadComponentModal(LoginFormComponent);
    }
    ShowProfileMenu() {
        this.profile_collapsed = !this.profile_collapsed;
    }
    CloseLoginForm() {
        this.modalService.LoadComponentModal(null);
    }
    LogOut() {
        this.authService.LogOut();
        console.log('logging out');
    }
}
