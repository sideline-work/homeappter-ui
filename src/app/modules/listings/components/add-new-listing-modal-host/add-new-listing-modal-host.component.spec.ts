import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewListingModalHostComponent } from './add-new-listing-modal-host.component';

describe('AddNewListingModalHostComponent', () => {
  let component: AddNewListingModalHostComponent;
  let fixture: ComponentFixture<AddNewListingModalHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewListingModalHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewListingModalHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
