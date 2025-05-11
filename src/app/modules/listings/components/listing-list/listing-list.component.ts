import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { HarProperty } from '@core/models/listing';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-listing-list',
  templateUrl: './listing-list.component.html',
  styleUrls: ['./listing-list.component.scss']
})
export class ListingListComponent implements OnInit {
  @Input() rows: HarProperty [] = [];
  @Output() onListingView = new EventEmitter<any>();
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  sortKey: string;

  constructor() { }

  ngOnInit(): void {
    this.sortOptions = [
      {label: 'Price High to Low', value: '!listPrice'},
      {label: 'Price Low to High', value: 'listPrice'}
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.rows && this.rows) {
    }
  }

  onClickView(listingId: number) {
    this.onListingView.emit(listingId);
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}
}
