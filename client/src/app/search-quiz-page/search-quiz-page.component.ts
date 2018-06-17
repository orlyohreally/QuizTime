import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { Test } from '../Test';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import { TestService } from '../test.service';
@Component({
  selector: 'app-search-quiz-page',
  templateUrl: './search-quiz-page.component.html',
  styleUrls: ['./search-quiz-page.component.css']
})
export class SearchQuizPageComponent implements OnInit {
    public quizzes: Test[];
    public topics:Observable<Select2OptionData[]>;
    public options: Select2Options;
    public tags: string[];
    constructor(private testService: TestService) { }

    getTests(): void {
        this.testService.getTests()
        .subscribe(tests => {
            this.quizzes = tests.results;
        });
    }
  
    ngOnInit() {
        this.getTests();
        this.options = {
            multiple: true,
            theme: 'classic',
            closeOnSelect: false
        }
        this.tags = [];
        this.topics = this.testService.getTopicsForSelect().delay(4000);
    }
}
