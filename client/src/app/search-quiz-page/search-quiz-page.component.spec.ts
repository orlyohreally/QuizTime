import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchQuizePageComponent } from './search-quize-page.component';

describe('SearchQuizePageComponent', () => {
  let component: SearchQuizePageComponent;
  let fixture: ComponentFixture<SearchQuizePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchQuizePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchQuizePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
