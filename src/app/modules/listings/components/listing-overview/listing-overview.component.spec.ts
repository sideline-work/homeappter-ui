import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingOverviewComponent } from './listing-overview.component';

describe('ListingOverviewComponent', () => {
  let component: ListingOverviewComponent;
  let fixture: ComponentFixture<ListingOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
