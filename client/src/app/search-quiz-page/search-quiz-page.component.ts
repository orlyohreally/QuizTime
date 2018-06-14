import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-quiz-page',
  templateUrl: './search-quiz-page.component.html',
  styleUrls: ['./search-quiz-page.component.css']
})
export class SearchQuizPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#topic-selector').select2();
    $('[name=key-words]').tagify();
  }

}
