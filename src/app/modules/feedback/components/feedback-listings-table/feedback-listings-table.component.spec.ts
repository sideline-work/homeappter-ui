import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackListingsTableComponent } from './feedback-listings-table.component';

describe('FeedbackListingsTableComponent', () => {
  let component: FeedbackListingsTableComponent;
  let fixture: ComponentFixture<FeedbackListingsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackListingsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackListingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
