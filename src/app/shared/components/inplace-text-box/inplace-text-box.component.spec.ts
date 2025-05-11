import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InplaceTextBoxComponent } from './inplace-text-box.component';

describe('InplaceTextBoxComponent', () => {
  let component: InplaceTextBoxComponent;
  let fixture: ComponentFixture<InplaceTextBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InplaceTextBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InplaceTextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
