import { Input } from '@angular/core';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-search-listings-filter',
  templateUrl: './search-listings-filter.component.html',
  styleUrls: ['./search-listings-filter.component.scss']
})
export class SearchListingsFilterComponent implements OnInit {
  @Output() search = new EventEmitter<any>();
  @Input()  isQuickSearchMode: boolean = false;
  @Output() isQuickSearchModeChange = new EventEmitter<boolean>();

  searchForm: FormGroup;
  searchListingFilterModes: SelectItem [] = [];

  // convenience getter for form controls
  get f(): { [key: string]: AbstractControl } {
    return this.searchForm.controls;
  }

  constructor() { }

  ngOnInit(): void {
    this.searchListingFilterModes = [
      {
        label: 'Any',
        value: 'ANY'
      },
      {
        label: 'Pending',
        value: 'PENDING'
      },
      {
        label: 'Active',
        value: 'ACTIVE'
      }
    ];
    this.initializeForm();
  }

  private initializeForm() {
    this.searchForm = new FormGroup({
      keyword: new FormControl(null),
      filter: new FormControl('ACTIVE', Validators.required),
    });
  }

  onClickSearch() {
    this.search.emit({
      formValue: this.searchForm.value
    });
  }

}
