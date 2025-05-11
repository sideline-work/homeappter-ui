import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '@core/http';
import { PreferenceService } from '@core/http/preference.service';
import { ErrorResponse } from '@core/models/api';
import { Property } from '@core/models/listing';
import { AlertService } from '@core/services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-listing-instruction',
  templateUrl: './listing-instruction.component.html',
  styleUrls: ['./listing-instruction.component.scss']
})
export class ListingInstructionComponent implements OnInit {

  alertKey: string;
  tab: number = 0;
  listing: Property;
  mlsNumber: string;

  constructor(
    private alertService: AlertService,
    private preferenceService: PreferenceService,
    private propertyService: PropertyService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.alertKey = this.router.url;
  }


  ngOnInit(): void {
    this.mlsNumber = this.route.snapshot.paramMap.get('mlsNumber');

    this.getListing();
  }

  getListing() {
    this.spinner.show();
    this.propertyService.getListing(this.mlsNumber).subscribe(
      (res) => {
        this.listing = res;
        this.spinner.hide();
      },
      (err: ErrorResponse) => {
        this.spinner.hide();
      }
    );
  }

}
