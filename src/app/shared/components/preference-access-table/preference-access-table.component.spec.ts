import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceAccessTableComponent } from './preference-access-table.component';

describe('PreferenceAccessTableComponent', () => {
  let component: PreferenceAccessTableComponent;
  let fixture: ComponentFixture<PreferenceAccessTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenceAccessTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceAccessTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
