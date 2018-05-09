import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizTimeDescriptionComponent } from './quiz-time-description.component';

describe('QuizTimeDescriptionComponent', () => {
  let component: QuizTimeDescriptionComponent;
  let fixture: ComponentFixture<QuizTimeDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizTimeDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizTimeDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
