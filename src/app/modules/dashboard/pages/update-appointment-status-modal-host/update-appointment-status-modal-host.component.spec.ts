import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAppointmentStatusModalHostComponent } from './update-appointment-status-modal-host.component';

describe('UpdateAppointmentStatusModalHostComponent', () => {
  let component: UpdateAppointmentStatusModalHostComponent;
  let fixture: ComponentFixture<UpdateAppointmentStatusModalHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAppointmentStatusModalHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAppointmentStatusModalHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
