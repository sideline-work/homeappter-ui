import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatDate, getTimeFromDate } from '@core/helpers';
import { PreferenceService } from '@core/http/preference.service';
import { ErrorResponse } from '@core/models/api';
import { PrefBlockDate, PreferenceBlockDate } from '@core/models/listing';
import { timeRangeValidator } from '@core/validators/time-range-validator.directive';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-preference-block-date-modal',
  templateUrl: './preference-block-date-modal.component.html',
  styleUrls: ['./preference-block-date-modal.component.scss']
})
export class PreferenceBlockDateModalComponent implements OnInit {

  blockDateForm: FormGroup;
  mlsNumber: string;
  title: string = 'Add Block Time';
  preferenceBlockDate: PreferenceBlockDate;

  constructor(
    private formBuilder: FormBuilder,
    private preferenceService: PreferenceService,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<PreferenceBlockDateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.mlsNumber = this.data.mlsNumber;
    this.preferenceBlockDate = this.data.preferenceBlockDate;
    this.initializeForm();
    if(this.preferenceBlockDate) {
      this.blockDateForm.patchValue({
        blockId: this.preferenceBlockDate.blockId,
        dateRange: [new Date(this.preferenceBlockDate.startDate), new Date(this.preferenceBlockDate.endDate)],
        startTime: new Date(this.getDateFromTime(this.preferenceBlockDate.startTime)),
        endTime: new Date(this.getDateFromTime(this.preferenceBlockDate.endTime))
      });
      this.title = 'Update Block Time';
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave() {
    console.log(this.blockDateForm.controls['dateRange'].value);
    this.spinner.show();
    const dateRange = this.blockDateForm.controls['dateRange'].value;
    const formValues = this.blockDateForm.value;
    const pref: PrefBlockDate = {
      blockId: formValues.blockId,
      mlsNumber: this.mlsNumber,
      startDate: formatDate(dateRange[0]),
      endDate: dateRange[1] ? formatDate(dateRange[1]) : formatDate(dateRange[0]),
      startTime: getTimeFromDate(formValues.startTime),
      endTime: getTimeFromDate(formValues.endTime),
    }

    this.preferenceService.saveBlockPreference(pref).subscribe(
      (res) => {
        this.preferenceBlockDate = res;
        this.dialogRef.close(this.preferenceBlockDate);
        this.spinner.hide();
      },
      (err: ErrorResponse) => {
        // this.alertService.error(err);
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  private getDateFromTime(time: string): any {
    if(time != null) {
      const hourMin: string []  = time.split(":");
      return new Date(new Date()).setHours(parseInt(hourMin[0]), parseInt(hourMin[1]));
    }
  }

  private initializeForm() {
    this.blockDateForm = this.formBuilder.group({
      blockId: [null],
      dateRange: [null, [Validators.required]],
      startTime: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
    },
    {
      validators: [timeRangeValidator()],
    }
    );
  }


}
