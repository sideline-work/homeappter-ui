import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailShowingInstructionsModalHostComponent } from './send-email-showing-instructions-modal-host.component';

describe('SendEmailShowingInstructionsModalHostComponent', () => {
  let component: SendEmailShowingInstructionsModalHostComponent;
  let fixture: ComponentFixture<SendEmailShowingInstructionsModalHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendEmailShowingInstructionsModalHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendEmailShowingInstructionsModalHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
