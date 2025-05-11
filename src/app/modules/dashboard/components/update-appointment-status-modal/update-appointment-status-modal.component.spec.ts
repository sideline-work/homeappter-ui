import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAppointmentStatusModalComponent } from './update-appointment-status-modal.component';

describe('UpdateAppointmentStatusModalComponent', () => {
  let component: UpdateAppointmentStatusModalComponent;
  let fixture: ComponentFixture<UpdateAppointmentStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAppointmentStatusModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAppointmentStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
