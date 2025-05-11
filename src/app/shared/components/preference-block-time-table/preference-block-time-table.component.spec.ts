import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceBlockTimeTableComponent } from './preference-block-time-table.component';

describe('PreferenceBlockTimeTableComponent', () => {
  let component: PreferenceBlockTimeTableComponent;
  let fixture: ComponentFixture<PreferenceBlockTimeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenceBlockTimeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceBlockTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
