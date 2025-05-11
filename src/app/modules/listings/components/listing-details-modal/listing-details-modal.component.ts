import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { flattenData } from '@core/helpers';
import { PropertyService } from '@core/http';
import { ErrorResponse } from '@core/models/api';
import { FormView } from '@core/models/form';
import { Property } from '@core/models/listing';
import { LoginData } from '@core/models/session';
import { SessionService } from '@core/services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-listing-details-modal',
  templateUrl: './listing-details-modal.component.html',
  styleUrls: ['./listing-details-modal.component.scss']
})
export class ListingDetailsModalComponent implements OnInit {

  formView = FormView.VIEW;
  listing: Property;
  listingDataForm: FormGroup;
  listingId: number;
  loginData: LoginData;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {listingId: number},
    private dialogRef: MatDialogRef<ListingDetailsModalComponent>,
    private propertyService: PropertyService,
    private router: Router,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.loginData = this.sessionService.currentUserValue;
    this.listingId = this.data.listingId;
    this.getListing();
  }

  getListing() {
    this.spinner.show();
    console.log(this.listingId);
    this.propertyService.getListing(this.listingId).subscribe(
      (res) => {
        this.listing = res;
        this.spinner.hide();
      },
      (err: ErrorResponse) => {
        this.spinner.hide();
      }
    );
  }

  scheduleAppointment() {
    const queryParams = flattenData(this.listing);
    this.dialogRef.close({event:'Schedule'});
    this.router.navigate(['/home/listings/schedule-appointment'], { queryParams });
  }

}
