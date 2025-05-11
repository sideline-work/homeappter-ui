import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListingsFilterComponent } from './search-listings-filter.component';

describe('SearchListingsFilterComponent', () => {
  let component: SearchListingsFilterComponent;
  let fixture: ComponentFixture<SearchListingsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchListingsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchListingsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
