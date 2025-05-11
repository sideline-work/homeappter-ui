import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentOtherRequestedTableComponent } from './appointment-other-requested-table.component';

describe('AppointmentOtherRequestedTableComponent', () => {
  let component: AppointmentOtherRequestedTableComponent;
  let fixture: ComponentFixture<AppointmentOtherRequestedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentOtherRequestedTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentOtherRequestedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
