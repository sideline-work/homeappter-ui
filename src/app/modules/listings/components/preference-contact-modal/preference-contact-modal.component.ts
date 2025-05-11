import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PreferenceService } from '@core/http/preference.service';
import { ErrorResponse } from '@core/models/api';
import { PrefContacts, PreferenceContacts } from '@core/models/listing';
import { methodOfnotificationValidator } from '@core/validators/method-of-notification-validator.diretive';
import { notificationTypeValidator } from '@core/validators/notification-type-validator.diretive';
import { timeRangeValidator } from '@core/validators/time-range-validator.directive';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-preference-contact-modal',
  templateUrl: './preference-contact-modal.component.html',
  styleUrls: ['./preference-contact-modal.component.scss']
})
export class PreferenceContactModalComponent implements OnInit {

  contactForm: FormGroup;
  mlsNumber: string;
  preferenceContact: PreferenceContacts;
  title: string = "Add Contact";

  constructor(
    private formBuilder: FormBuilder,
    private preferenceService: PreferenceService,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<PreferenceContactModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.mlsNumber = this.data.mlsNumber;
    this.preferenceContact = this.data.preferenceContact;
    this.initializeForm();
    if(this.preferenceContact) {
      this.contactForm.patchValue({
        ...this.preferenceContact
      });
      this.title = 'Update Contact';
    }

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave() {
    this.spinner.show();
    const prefContacts: PrefContacts = {
      ... this.contactForm.value,
    }

    this.preferenceService.saveContactPreference(prefContacts).subscribe(
      (res) => {
        this.preferenceContact = res;
        this.dialogRef.close(this.preferenceContact);
        this.spinner.hide();
      },
      (err: ErrorResponse) => {
        // this.alertService.error(err);
        this.spinner.hide();
      }
    );

  }

  private initializeForm() {
    this.contactForm = this.formBuilder.group({
      contactPrefId: [null],
      mlsNumber: [this.mlsNumber],
      contactType: [null, [Validators.required]],
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      notifViaEmail: [false],
      notifViaCall: [false],
      notifViaSms: [false],
      receivedNotifShowingApproval: [false],
      receivedNotifAppointmentStatus: [false],
      receivedNotifShowingFeedback: [false],
      priority: [false],
    },
    {
      validators: [methodOfnotificationValidator(), notificationTypeValidator()],
    }
    );
  }



}
