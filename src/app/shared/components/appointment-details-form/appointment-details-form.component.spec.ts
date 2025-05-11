import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDetailsFormComponent } from './appointment-details-form.component';

describe('AppointmentDetailsFormComponent', () => {
  let component: AppointmentDetailsFormComponent;
  let fixture: ComponentFixture<AppointmentDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
