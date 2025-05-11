import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentRequestedTableComponent } from './appointment-requested-table.component';

describe('AppointmentRequestedTableComponent', () => {
  let component: AppointmentRequestedTableComponent;
  let fixture: ComponentFixture<AppointmentRequestedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentRequestedTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentRequestedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
