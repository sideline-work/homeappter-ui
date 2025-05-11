import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HarProperty } from '@core/models/listing';

@Component({
  selector: 'app-listing-item-grid-view',
  templateUrl: './listing-item-grid-view.component.html',
  styleUrls: ['./listing-item-grid-view.component.scss']
})
export class ListingItemGridViewComponent implements OnInit {

  @Input() listing: HarProperty;
  @Output() onListingView = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickView(listingId: string) {
    this.onListingView.emit(listingId);
  }

}
