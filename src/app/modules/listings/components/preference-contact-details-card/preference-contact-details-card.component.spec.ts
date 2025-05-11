import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceContactDetailsCardComponent } from './preference-contact-details-card.component';

describe('PreferenceContactDetailsCardComponent', () => {
  let component: PreferenceContactDetailsCardComponent;
  let fixture: ComponentFixture<PreferenceContactDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenceContactDetailsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceContactDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
