import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingInstructionComponent } from './listing-instruction.component';

describe('ListingInstructionComponent', () => {
  let component: ListingInstructionComponent;
  let fixture: ComponentFixture<ListingInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingInstructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
