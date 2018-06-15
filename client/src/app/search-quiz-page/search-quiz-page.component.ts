import { Component, OnInit } from '@angular/core';

import { Select2OptionData } from 'ng2-select2';

import * as tagify from 'jquery.tagify';
@Component({
  selector: 'app-search-quiz-page',
  templateUrl: './search-quiz-page.component.html',
  styleUrls: ['./search-quiz-page.component.css']
})
export class SearchQuizPageComponent implements OnInit {
  public topics:Array<Select2OptionData>;
  constructor() { }

  ngOnInit() {
    this.topics = [
        {id: '1', text: 'text1'},
        {id: '2', text: 'text2'},
        {id: '3', text: 'text3'}
    ];
    //$('[name=key-words]').tagify();
  }

}
