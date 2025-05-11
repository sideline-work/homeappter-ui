import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceBlockDateFormComponent } from './preference-block-date-form.component';

describe('PreferenceBlockDateFormComponent', () => {
  let component: PreferenceBlockDateFormComponent;
  let fixture: ComponentFixture<PreferenceBlockDateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenceBlockDateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceBlockDateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
