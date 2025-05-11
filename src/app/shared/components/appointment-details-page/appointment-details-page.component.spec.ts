import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDetailsPageComponent } from './appointment-details-page.component';

describe('AppointmentDetailsPageComponent', () => {
  let component: AppointmentDetailsPageComponent;
  let fixture: ComponentFixture<AppointmentDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentDetailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
