import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';

import { Observable } from 'rxjs/Observable';

import { TestService } from '../test.service';
@Component({
  selector: 'app-search-quiz-page',
  templateUrl: './search-quiz-page.component.html',
  styleUrls: ['./search-quiz-page.component.css']
})
export class SearchQuizPageComponent implements OnInit {
  public topics:Observable<Array<Select2OptionData>>;
  public defaultTopic: Observable<string>;
  public tags: string[];
  constructor(private testService: TestService) { }

  ngOnInit() {
    this.topics = [];
    /*this.testService.getTopics()
    .subscribe(topics => {
        topics.results.forEach(topic=>{
            console.log(topic, {id: topic.id, text: topic.name});
            //this.topics.push({id: topic.id, text: topic.name});
            defaultTopic = topic.name;
        })
        
    });*/
    this.topics = [
        {id: '1', text: 'text1'},
        {id: '2', text: 'text2'},
        {id: '3', text: 'text3'}
    ];
  }
}
