import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceBlockDateDetailsCardComponent } from './preference-block-date-details-card.component';

describe('PreferenceBlockDateDetailsCardComponent', () => {
  let component: PreferenceBlockDateDetailsCardComponent;
  let fixture: ComponentFixture<PreferenceBlockDateDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenceBlockDateDetailsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceBlockDateDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
