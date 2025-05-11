import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewListingModalComponent } from './add-new-listing-modal.component';

describe('AddNewListingModalComponent', () => {
  let component: AddNewListingModalComponent;
  let fixture: ComponentFixture<AddNewListingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewListingModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewListingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
