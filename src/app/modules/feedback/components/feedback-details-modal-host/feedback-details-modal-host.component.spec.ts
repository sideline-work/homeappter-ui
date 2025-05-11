import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackDetailsModalHostComponent } from './feedback-details-modal-host.component';

describe('FeedbackDetailsModalHostComponent', () => {
  let component: FeedbackDetailsModalHostComponent;
  let fixture: ComponentFixture<FeedbackDetailsModalHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackDetailsModalHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackDetailsModalHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
