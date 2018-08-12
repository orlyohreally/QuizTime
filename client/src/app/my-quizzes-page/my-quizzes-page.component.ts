import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { Test } from '../Test';

import { ModalService } from '../modal.service';
import { Observable } from 'rxjs/Observable';
import { TestService } from '../test.service';

import { TestFormComponent } from '../test-form/test-form.component';

@Component({
  selector: 'app-my-quizzes-page',
  templateUrl: './my-quizzes-page.component.html',
  styleUrls: ['./my-quizzes-page.component.css']
})
export class MyQuizzesPageComponent implements OnInit {
    public quizzes: Test[];
    public topics:Observable<Select2OptionData[]>;
    public subjects:Observable<Select2OptionData[]>;
    public options: Select2Options;
    public tags: string[];
    constructor(private modalService: ModalService, private testService: TestService) { }

    getTests(): void {
        this.testService.getTests()
        .subscribe(tests => {
            console.log(tests);
            this.quizzes = tests.results.filter(test=>{
                return test.edit;
            });
        });
    }
    
    NewQuiz() {        
        this.modalService.LoadComponentModal(TestFormComponent);
    }
    EditQuiz(id) {console.log(id);
        this.testService.getTest(id)
        .subscribe(test => {console.log(test);
            test.icon = null;
            this.modalService.LoadComponentModal(TestFormComponent, test);
        });
        
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
