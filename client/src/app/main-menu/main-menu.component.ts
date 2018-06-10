import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { LoginFormComponent } from '../login-form/login-form.component';

//import { LandingPageComponent } from '../landing-page/landing-page.component';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private modalService: ModalService, private appComponent: AppComponent) {}

  ngOnInit() { }
  ShowLoginForm() {
    this.appComponent.LoadComponentModal(LoginFormComponent);
  }
  CloseLoginForm() {
    this.appComponent.CloseComponentModal();
  }
}
