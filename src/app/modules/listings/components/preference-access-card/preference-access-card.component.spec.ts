import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceAccessCardComponent } from './preference-access-card.component';

describe('PreferenceAccessCardComponent', () => {
  let component: PreferenceAccessCardComponent;
  let fixture: ComponentFixture<PreferenceAccessCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenceAccessCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceAccessCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
