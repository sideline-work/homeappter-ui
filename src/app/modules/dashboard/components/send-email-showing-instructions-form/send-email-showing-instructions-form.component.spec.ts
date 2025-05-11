import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailShowingInstructionsFormComponent } from './send-email-showing-instructions-form.component';

describe('SendEmailShowingInstructionsFormComponent', () => {
  let component: SendEmailShowingInstructionsFormComponent;
  let fixture: ComponentFixture<SendEmailShowingInstructionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendEmailShowingInstructionsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendEmailShowingInstructionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
