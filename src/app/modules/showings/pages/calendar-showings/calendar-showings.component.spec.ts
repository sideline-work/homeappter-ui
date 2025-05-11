import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarShowingsComponent } from './calendar-showings.component';

describe('CalendarShowingsComponent', () => {
  let component: CalendarShowingsComponent;
  let fixture: ComponentFixture<CalendarShowingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarShowingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarShowingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
