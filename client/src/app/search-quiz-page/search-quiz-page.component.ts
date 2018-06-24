import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { Test } from '../Test';

import { Observable } from 'rxjs/Observable';
import { TestService } from '../test.service';


@Component({
  selector: 'app-search-quiz-page',
  templateUrl: './search-quiz-page.component.html',
  styleUrls: ['./search-quiz-page.component.css']
})
export class SearchQuizPageComponent implements OnInit {
    public quizzes: Test[];
    public topics:Observable<Select2OptionData[]>;
    public subjects:Observable<Select2OptionData[]>;
    public options: Select2Options;
    public tags: string[];
    constructor(private testService: TestService) { }

    getTests(): void {
        this.testService.getTests()
        .subscribe(tests => {
            console.log(tests);
            this.quizzes = tests.results;
        });
    }
    SearchQuizzes() {
        console.log(this.topics, this.tags);
        this.topics.subscribe(topic=>{
            console.log(topic);
        });
        this.subjects.subscribe(subject=>{
            console.log(subject);
        });
    }
    TopicChanged(e) {
        console.log('topic changed', e, e.value, this.topics);
        this.subjects = this.testService.getSubjectsForSelectTopic(e.value);
        
    }
    ngOnInit() {
        this.getTests();
        this.options = {
            multiple: true,
            theme: 'classic'
        }
        this.tags = [];
        this.topics = this.testService.getTopicsForSelect();
        this.subjects = this.testService.getSubjectsForSelect();
    }
}
