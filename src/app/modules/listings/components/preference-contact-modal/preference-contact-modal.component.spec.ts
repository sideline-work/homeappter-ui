import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceContactModalComponent } from './preference-contact-modal.component';

describe('PreferenceContactModalComponent', () => {
  let component: PreferenceContactModalComponent;
  let fixture: ComponentFixture<PreferenceContactModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenceContactModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceContactModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
