import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatDate, getTimeFromDate } from '@core/helpers';
import { PreferenceService } from '@core/http/preference.service';
import { ErrorResponse } from '@core/models/api';
import { PrefAccess, PrefBlockDate, PreferenceAccess } from '@core/models/listing';
import { timeRangeValidator } from '@core/validators/time-range-validator.directive';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-preference-access-modal',
  templateUrl: './preference-access-modal.component.html',
  styleUrls: ['./preference-access-modal.component.scss']
})
export class PreferenceAccessModalComponent implements OnInit {

  accessForm: FormGroup;
  mlsNumber: string;
  preferenceAccess: PreferenceAccess;
  title: string = 'Add Access';

  constructor(
    private formBuilder: FormBuilder,
    private preferenceService: PreferenceService,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<PreferenceAccessModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.mlsNumber = this.data.mlsNumber;
    this.preferenceAccess = this.data.preferenceAccess;
    this.initializeForm();
    if(this.preferenceAccess) {
      this.accessForm.patchValue({
        accessId: this.preferenceAccess.accessId,
        accessType: this.preferenceAccess.accessType,
        accessCode: this.preferenceAccess.accessCode,
        remarks: this.preferenceAccess.remarks,
        location: this.preferenceAccess.location,
      });
      this.title = 'Update Access';
    }
    this.accessForm.controls['accessType'].valueChanges.subscribe(res => {
      if(res == 'SUPRA_LOCKBOX' || res == 'COMBO_LOCKBOX') {
        this.accessForm.get('location').setValidators([Validators.required]);
        this.accessForm.get('location').updateValueAndValidity();
      } else {
        this.accessForm.get('location').clearValidators();
        this.accessForm.get('location').updateValueAndValidity();
      }
    });
  }


  onCancel(): void {
    this.dialogRef.close();
  }

  onSave() {
    const formValues = this.accessForm.value;
    const pref: PrefAccess = {
      ... formValues,
      mlsNumber: this.mlsNumber
    }

    this.preferenceService.saveAccessPreference(pref).subscribe(
      (res) => {
        this.preferenceAccess = res;
        this.dialogRef.close(this.preferenceAccess);
        this.spinner.hide();
      },
      (err: ErrorResponse) => {
        // this.alertService.error(err);
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  private initializeForm() {
    this.accessForm = this.formBuilder.group({
      accessId: [null],
      accessType: [null, [Validators.required]],
      accessCode: [null],
      remarks: [null],
      location: [null],
    });
  }

}
