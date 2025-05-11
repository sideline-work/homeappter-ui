import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingInstructionOverviewComponent } from './showing-instruction-overview.component';

describe('ShowingInstructionOverviewComponent', () => {
  let component: ShowingInstructionOverviewComponent;
  let fixture: ComponentFixture<ShowingInstructionOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowingInstructionOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowingInstructionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
