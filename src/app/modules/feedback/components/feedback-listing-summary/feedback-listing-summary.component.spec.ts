import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackListingSummaryComponent } from './feedback-listing-summary.component';

describe('FeedbackListingSummaryComponent', () => {
  let component: FeedbackListingSummaryComponent;
  let fixture: ComponentFixture<FeedbackListingSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackListingSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackListingSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
