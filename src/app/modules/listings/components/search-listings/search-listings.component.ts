import { Component, OnInit } from '@angular/core';

import { ErrorResponse } from '@core/models/api';
import { HarProperty, PropertyAdvanceSearchRequest } from '@core/models/listing';
import { NgxSpinnerService } from 'ngx-spinner';
import { PropertyService } from '@core/http';
import { Router } from '@angular/router';
import { SessionService } from '@core/services';

@Component({
  selector: 'app-search-listings',
  templateUrl: './search-listings.component.html',
  styleUrls: ['./search-listings.component.scss']
})
export class SearchListingsComponent implements OnInit {

  rows: HarProperty[];

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  onClickView(event) {
    this.router.navigate(['/home/listings/details/' + event],  {
    });
  }

  onSearch(event: any) {
    this.search(event.formValue);
  }

  private search(value: any) {
    this.rows = [];

    this.spinner.show();

    this.propertyService.search(value.keyword, value.filter).subscribe(
      (res) => {
        this.rows = res;
        this.spinner.hide();
      },
      (err: ErrorResponse) => {
        // this.alertService.error(err);
        this.spinner.hide();
      }
    );
  }

}
