import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentUserRequestedTableComponent } from './appointment-user-requested-table.component';

describe('AppointmentUserRequestedTableComponent', () => {
  let component: AppointmentUserRequestedTableComponent;
  let fixture: ComponentFixture<AppointmentUserRequestedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentUserRequestedTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentUserRequestedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
