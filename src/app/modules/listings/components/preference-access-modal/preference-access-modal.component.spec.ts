import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceAccessModalComponent } from './preference-access-modal.component';

describe('PreferenceAccessModalComponent', () => {
  let component: PreferenceAccessModalComponent;
  let fixture: ComponentFixture<PreferenceAccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenceAccessModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceAccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
