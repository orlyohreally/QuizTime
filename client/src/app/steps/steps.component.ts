import { Component, OnInit } from '@angular/core';
import { Step } from '../step';
import { TestService } from '../test.service';
@Component({
    selector: 'app-steps',
    templateUrl: './steps.component.html',
    styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
    steps: Step[];
    constructor(private testService: TestService) { }

    ngOnInit() {
        this.getSteps();
    }
    getSteps(): void {
        this.testService.getSteps()
        .subscribe(steps => this.steps = steps.results);
    }

}
