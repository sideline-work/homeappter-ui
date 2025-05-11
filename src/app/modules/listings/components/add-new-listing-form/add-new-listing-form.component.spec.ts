import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewListingFormComponent } from './add-new-listing-form.component';

describe('AddNewListingFormComponent', () => {
  let component: AddNewListingFormComponent;
  let fixture: ComponentFixture<AddNewListingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewListingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewListingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
