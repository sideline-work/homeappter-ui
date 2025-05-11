import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceContactFormComponent } from './preference-contact-form.component';

describe('PreferenceContactFormComponent', () => {
  let component: PreferenceContactFormComponent;
  let fixture: ComponentFixture<PreferenceContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenceContactFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
