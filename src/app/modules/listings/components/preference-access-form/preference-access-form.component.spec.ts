import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceAccessFormComponent } from './preference-access-form.component';

describe('PreferenceAccessFormComponent', () => {
  let component: PreferenceAccessFormComponent;
  let fixture: ComponentFixture<PreferenceAccessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenceAccessFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceAccessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
