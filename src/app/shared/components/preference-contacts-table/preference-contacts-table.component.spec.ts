import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceContactsTableComponent } from './preference-contacts-table.component';

describe('PreferenceContactsTableComponent', () => {
  let component: PreferenceContactsTableComponent;
  let fixture: ComponentFixture<PreferenceContactsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenceContactsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceContactsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
