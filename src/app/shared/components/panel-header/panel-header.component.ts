import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-header',
  templateUrl: './panel-header.component.html',
  styleUrls: ['./panel-header.component.scss']
})
export class PanelHeaderComponent implements OnInit {

  @Input() title: string;
  @Input() headerType: string;

  constructor() { }

  ngOnInit(): void {
  }

}
