import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() visible: boolean;
  @Output() visibleChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  onClickSidebarClose(): void {
    this.visibleChange.emit(false);
  }
}
