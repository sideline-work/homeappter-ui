import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HarProperty } from '@core/models/listing';

@Component({
  selector: 'app-listing-item-list-view',
  templateUrl: './listing-item-list-view.component.html',
  styleUrls: ['./listing-item-list-view.component.scss']
})
export class ListingItemListViewComponent implements OnInit {

  @Input() listing: HarProperty;
  @Output() onListingView = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickView(listingId: string) {
    this.onListingView.emit(listingId);
  }

}
