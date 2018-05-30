import { Component, OnInit } from '@angular/core';

import { ModalService }         from '../modal.service';
import { ModalItem }            from '../modal-item';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  
  ads: ModalItem[];
  constructor(private modalService: ModalService) { }
  
  ngOnInit() {
    this.ads = this.modalService.getAds();
  }

}
