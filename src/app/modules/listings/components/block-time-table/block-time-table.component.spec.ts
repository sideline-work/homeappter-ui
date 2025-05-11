import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockTimeTableComponent } from './block-time-table.component';

describe('BlockTimeTableComponent', () => {
  let component: BlockTimeTableComponent;
  let fixture: ComponentFixture<BlockTimeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockTimeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
