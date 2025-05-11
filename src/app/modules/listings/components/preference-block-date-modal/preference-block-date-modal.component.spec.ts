import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceBlockDateModalComponent } from './preference-block-date-modal.component';

describe('PreferenceBlockDateModalComponent', () => {
  let component: PreferenceBlockDateModalComponent;
  let fixture: ComponentFixture<PreferenceBlockDateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenceBlockDateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceBlockDateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
