import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '@core/http';
import { PreferenceService } from '@core/http/preference.service';
import { ErrorResponse } from '@core/models/api';
import { ShowingListing } from '@core/models/listing';
import { Column, Table } from '@core/models/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-new-listing',
  templateUrl: './new-listing.component.html',
  styleUrls: ['./new-listing.component.scss']
})
export class NewListingComponent implements OnInit, OnDestroy {

  alertKey: string;
  columns: Column [] = [];
  disabledProperties: Table<ShowingListing>;
  enabledProperties: Table<ShowingListing>;
  newListingSubscription: Subscription;

  constructor(
    private propertyService: PropertyService,
    private preferenceService: PreferenceService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {
    this.alertKey = this.router.url;
  }
  ngOnDestroy(): void {
    this.newListingSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.columns = [
      {
        dataField: "mlsNumber",
        headerText: "MLS #",
        dataType: "number",
        style: "width: 12%",
      },
      {
        dataField: "fullAddress",
        headerText: "Address",
        dataType: "string",
        style: "width: 32%",
        wrap: true
      },
      {
        dataField: "propertyType",
        dataType: "string",
        style: "width: 14%",
      },
      {
        dataField: "preferenceStatus",
        dataType: "string",
        style: "width: 18%",
      },
      // {
      //   dataField: "listType",
      //   dataType: "string",
      //   style: "width: 20%",
      // },
      {
        dataField: "",
        headerText: "",
        dataType: "templateRef",
        style: "width: 23%",
        colTemplateRefName: 'listingActionTemplate',
      },
    ];
    this.enabledProperties= {
      columns: this.columns,
      rows: []
    };
    this.disabledProperties= {
      columns: this.columns,
      rows: []
    };
    this.getNewListings();
    this.newListingSubscription = this.preferenceService.getNewListingUpdates$().subscribe((update: boolean) => {
      if(update) {
        this.getNewListings();
      }
    });
  }

  onChangeStatusToEnable(row: any) {
    this.router.navigate(['/home/listings/listing-instructions/'+ row.id]);
  }

  onChangeStatusToDisable(row: ShowingListing) {
    this.spinner.show();

    this.preferenceService.disablePreference(row.mlsNumber).subscribe(
      (res) => {
        this.spinner.hide();
        this.getNewListings();
      },
      (err: ErrorResponse) => {
        this.spinner.hide();
        // this.alertService.error(err);
      }
    );
  }

  onShowListingInstruction(row: ShowingListing) {
    this.router.navigate(['/home/listings/listing-instructions/'+ row.mlsNumber]);
  }

  getNewListings() {
    this.spinner.show();

    this.preferenceService.getNewListing().subscribe(
      (res) => {
        this.spinner.hide();
        this.enabledProperties.rows = res.enabledListing;
        this.disabledProperties.rows = res.disabledListing;
      },
      (err: ErrorResponse) => {
        this.spinner.hide();
        // this.alertService.error(err);
      }
    );
  }

}
