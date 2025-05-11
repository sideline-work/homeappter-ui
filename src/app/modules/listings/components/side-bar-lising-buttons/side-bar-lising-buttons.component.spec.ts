import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarLisingButtonsComponent } from './side-bar-lising-buttons.component';

describe('SideBarLisingButtonsComponent', () => {
  let component: SideBarLisingButtonsComponent;
  let fixture: ComponentFixture<SideBarLisingButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarLisingButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarLisingButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
