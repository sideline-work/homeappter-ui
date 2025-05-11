import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PropertyService } from '@core/http';
import { ErrorResponse } from '@core/models/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-new-listing-modal',
  templateUrl: './add-new-listing-modal.component.html',
  styleUrls: ['./add-new-listing-modal.component.scss']
})
export class AddNewListingModalComponent implements OnInit, OnDestroy  {

  addNewListingForm: FormGroup;

  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private propertyService: PropertyService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<AddNewListingModalComponent>,
  ) { }


  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.addNewListingForm = this.formBuilder.group({
      listAgentFullname:  [null,  [Validators.required]],
      listAgentEmail:  [null,  [Validators.email]],
      listAgentPhone:  [null,  [Validators.required]],
      mlsNumber:  [null,  [Validators.required]],
      propertyType:  [null,  [Validators.required]],
      propertyStatus:  [null,  [Validators.required]],
      listOfficeName:  [null,  [Validators.required]],
      fullAddress:  [null,  [Validators.required]],
      buildingSqft:  [null,  [Validators.required]],
      bedrooms:  [null,  [Validators.required]],
      bathTotal:  [null,  [Validators.required]],
      publicRemarks:  [null,  [Validators.required]],
      directions:  [null,  [Validators.required]],
      //manualRequest: [this.hasRole.transform(ROLES.ADMIN)],
    });
  }

  onAddNewListing() {
    this.spinner.show();
    const listing : any = this.addNewListingForm.value;
    this.propertyService.saveNewListing(listing).subscribe(
      (res) => {
        //this.userAppointmentStatResponse = res;
        this.spinner.hide();
      },
      (err: ErrorResponse) => {
        this.spinner.hide();
        // this.alertService.error(err);
      }
    );
  }

}
