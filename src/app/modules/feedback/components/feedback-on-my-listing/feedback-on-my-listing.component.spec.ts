import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackOnMyListingComponent } from './feedback-on-my-listing.component';

describe('FeedbackOnMyListingComponent', () => {
  let component: FeedbackOnMyListingComponent;
  let fixture: ComponentFixture<FeedbackOnMyListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackOnMyListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackOnMyListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
