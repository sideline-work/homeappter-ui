import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountOverviewWidgetComponent } from './count-overview-widget.component';

describe('CountOverviewWidgetComponent', () => {
  let component: CountOverviewWidgetComponent;
  let fixture: ComponentFixture<CountOverviewWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountOverviewWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountOverviewWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
