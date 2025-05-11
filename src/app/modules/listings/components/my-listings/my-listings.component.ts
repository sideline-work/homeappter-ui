import { Component, OnInit } from '@angular/core';

import { ErrorResponse } from '@core/models/api';
import { HarProperty } from '@core/models/listing';
import { NgxSpinnerService } from 'ngx-spinner';
import { PropertyService } from '@core/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-listings',
  templateUrl: './my-listings.component.html',
  styleUrls: ['./my-listings.component.scss']
})
export class MyListingsComponent implements OnInit {

  rows: HarProperty[];
  showListingDetailsModal = false;
  selectedListingId: number;


  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.populate();
  }

  onClickView(event) {
    this.router.navigate(['/home/listings/details/'+ event]);
  }

  private populate() {
    this.spinner.show();

    this.propertyService.getListings().subscribe(
      (res) => {
        this.rows = res;
        this.spinner.hide();
      },
      (err: ErrorResponse) => {
        this.spinner.hide();
        // this.alertService.error(err);
      }
    );
  }

}
