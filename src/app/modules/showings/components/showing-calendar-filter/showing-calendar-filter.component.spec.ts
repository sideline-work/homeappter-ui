import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingCalendarFilterComponent } from './showing-calendar-filter.component';

describe('ShowingCalendarFilterComponent', () => {
  let component: ShowingCalendarFilterComponent;
  let fixture: ComponentFixture<ShowingCalendarFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowingCalendarFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowingCalendarFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
