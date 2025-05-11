import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackListingsIHaveShownComponent } from './feedback-listings-ihave-shown.component';

describe('FeedbackListingsIHaveShownComponent', () => {
  let component: FeedbackListingsIHaveShownComponent;
  let fixture: ComponentFixture<FeedbackListingsIHaveShownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackListingsIHaveShownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackListingsIHaveShownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
