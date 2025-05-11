import { Component, Input, OnInit } from '@angular/core';
import { Property } from '@core/models/listing';

@Component({
  selector: 'app-listing-overview',
  templateUrl: './listing-overview.component.html',
  styleUrls: ['./listing-overview.component.scss']
})
export class ListingOverviewComponent implements OnInit {

  @Input() listing: Property;

  constructor() { }

  ngOnInit(): void {
  }

}
