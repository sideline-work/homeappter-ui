import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { ROLES } from '@core/constants/auth';
import { AppointmentService } from '@core/http';
import { Property } from '@core/models/listing';
import { HasRolePipe } from '@shared/pipes';
import { SelectItem } from 'primeng/api/public_api';

@Component({
  selector: 'app-schedule-appointment-form',
  templateUrl: './schedule-appointment-form.component.html',
  styleUrls: ['./schedule-appointment-form.component.scss']
})
export class ScheduleAppointmentFormComponent implements OnInit {

  readonly ROLES = ROLES;

  @Input() formGroupValue: FormGroup;
  @Input() availableTimeSlot: SelectItem [] = [];
  @Input() isMember: boolean = false;
  @Input() listing: Property;
  isManualRequest: boolean = false;
  maxDate: Date;
  minDate: Date;

  // convenience getter for form controls
  get f(): { [key: string]: AbstractControl } {
    return this.formGroupValue.controls;
  }

  get fgErrors(): { [key: string]: ValidationErrors } {
    return this.formGroupValue.errors;
  }


  constructor(
    private appointmentService: AppointmentService,
    private hasRole: HasRolePipe
    ) {
    const today = new Date();
    this.minDate = today;
  }

  ngOnInit(): void {
    this.isManualRequest = this.hasRole.transform(ROLES.ADMIN) == true;
    this.formGroupValue.controls['startTime'].valueChanges.subscribe((res)=> {
      if(res) {
        const startTimeDate = new Date(res);
        const updateEndTimeDate = new Date(startTimeDate.getTime() + (this.listing.showingDuration * 60000))
        this.formGroupValue.controls['endTime'].setValue(updateEndTimeDate);
      }
    });
    this.updateManualRequestValidity();
    // this.formGroupValue.controls['manualRequest'].valueChanges.subscribe((res)=> {
    //   this.isManualRequest = res;
    //   if(res) {
    //     this.formGroupValue.controls['requestorName'].setValidators([Validators.required]);
    //     this.formGroupValue.controls['requestorOfficeName'].setValidators([Validators.required]);
    //   } else {
    //     this.formGroupValue.controls['requestorName'].setValidators([]);
    //     this.formGroupValue.controls['requestorOfficeName'].setValidators([]);
    //   }
    //   this.formGroupValue.controls['requestorName'].updateValueAndValidity();
    //   this.formGroupValue.controls['requestorOfficeName'].updateValueAndValidity();
    // })
  }

  private updateManualRequestValidity() {
    if(this.isManualRequest) {
      this.formGroupValue.controls['requestorMemberMLSID'].setValidators([Validators.required]);
      this.formGroupValue.controls['requestorName'].setValidators([Validators.required]);
      this.formGroupValue.controls['requestorOfficeName'].setValidators([Validators.required]);
    } else {
      this.formGroupValue.controls['requestorMemberMLSID'].setValidators([]);
      this.formGroupValue.controls['requestorName'].setValidators([]);
      this.formGroupValue.controls['requestorOfficeName'].setValidators([]);
    }
    this.formGroupValue.controls['requestorMemberMLSID'].updateValueAndValidity();
    this.formGroupValue.controls['requestorName'].updateValueAndValidity();
    this.formGroupValue.controls['requestorOfficeName'].updateValueAndValidity();
  }

}
