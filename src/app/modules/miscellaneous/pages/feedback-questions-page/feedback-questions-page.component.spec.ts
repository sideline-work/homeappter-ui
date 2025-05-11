import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackQuestionsPageComponent } from './feedback-questions-page.component';

describe('FeedbackQuestionsPageComponent', () => {
  let component: FeedbackQuestionsPageComponent;
  let fixture: ComponentFixture<FeedbackQuestionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackQuestionsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackQuestionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
