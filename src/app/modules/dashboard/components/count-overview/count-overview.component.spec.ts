import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountOverviewComponent } from './count-overview.component';

describe('CountOverviewComponent', () => {
  let component: CountOverviewComponent;
  let fixture: ComponentFixture<CountOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
