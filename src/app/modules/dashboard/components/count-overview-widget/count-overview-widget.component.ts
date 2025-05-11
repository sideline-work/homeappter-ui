import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-count-overview-widget',
  templateUrl: './count-overview-widget.component.html',
  styleUrls: ['./count-overview-widget.component.scss']
})
export class CountOverviewWidgetComponent implements OnInit {

  @Input() overviewItem: {
    title: string;
    value: number;
    background: string;
    icon: string;
  };

  constructor() { }

  ngOnInit(): void {
  }

}
