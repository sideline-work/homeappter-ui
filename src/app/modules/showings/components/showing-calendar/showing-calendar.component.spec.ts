import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingCalendarComponent } from './showing-calendar.component';

describe('ShowingCalendarComponent', () => {
  let component: ShowingCalendarComponent;
  let fixture: ComponentFixture<ShowingCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowingCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowingCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
