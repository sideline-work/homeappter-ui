import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '@core/http';
import { ErrorResponse } from '@core/models/api';
import { FormView } from '@core/models/form';
import { Property } from '@core/models/listing';
import { LoginData } from '@core/models/session';
import { SessionService } from '@core/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { flattenData } from '@core/helpers';

@Component({
  selector: 'app-listing-details-page',
  templateUrl: './listing-details-page.component.html',
  styleUrls: ['./listing-details-page.component.scss']
})
export class ListingDetailsPageComponent implements OnInit {

  formView = FormView.VIEW;
  listing: Property;
  listingDataForm: FormGroup;
  listingId: string;
  loginData: LoginData;
  visible: boolean = false;

  constructor(
    private propertyService: PropertyService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.loginData = this.sessionService.currentUserValue;
    this.listingId = this.route.snapshot.paramMap.get('listingId');

    this.getListing();
  }

  onHide() {

  }

  onClose() {
    this.visible = false;
    setTimeout(() => {
         this.location.back();
    }, 30);
  }

  private getListing() {
    this.spinner.show();
    this.propertyService.getListing(this.listingId).subscribe(
      (res) => {
        this.listing = res;
        console.log(this.listing);
        this.spinner.hide();
        //this.visible = true;
        setTimeout(() => {
          this.visible = true;
        }, 50);
      },
      (err: ErrorResponse) => {
        this.spinner.hide();
      }
    );
  }

  scheduleAppointment() {
    this.visible = false;
    setTimeout(() => {
      const queryParams = flattenData(this.listing);
      this.router.navigate(['/home/listings/schedule-appointment'], { queryParams, skipLocationChange: true });
    }, 20);

  }

}
