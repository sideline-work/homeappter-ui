import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAppointmentStatusFormComponent } from './update-appointment-status-form.component';

describe('UpdateAppointmentStatusFormComponent', () => {
  let component: UpdateAppointmentStatusFormComponent;
  let fixture: ComponentFixture<UpdateAppointmentStatusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAppointmentStatusFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAppointmentStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
