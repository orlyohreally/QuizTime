import { Component, OnInit } from '@angular/core';
import { Topic } from '../topic';
import { TestService } from '../test.service';
@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
    topics: Topic[];
    
    constructor(private testService: TestService) {}
    ngOnInit() {
        this.getTopics();
    }
    getTopics(): void {
        this.testService.getTopics()
        .subscribe(topics => {
            this.topics = topics.results;
        });
    }
}
