import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { LoginFormComponent } from '../login-form/login-form.component';
@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    //$('button').click(function(){alert('h');});
  }
}
