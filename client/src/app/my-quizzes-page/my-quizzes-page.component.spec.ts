import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQuizzesPageComponent } from './search-quize-page.component';

describe('MyQuizzesPageComponent', () => {
  let component: MyQuizzesPageComponent;
  let fixture: ComponentFixture<MyQuizzesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyQuizzesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQuizzesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
