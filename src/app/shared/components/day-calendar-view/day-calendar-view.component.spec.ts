import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayCalendarViewComponent } from './day-calendar-view.component';

describe('DayCalendarViewComponent', () => {
  let component: DayCalendarViewComponent;
  let fixture: ComponentFixture<DayCalendarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayCalendarViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayCalendarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
