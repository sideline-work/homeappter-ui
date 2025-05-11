import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, DialogService, SessionService } from '@core/services';
import { AppointmentService, PropertyService } from '@core/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { formatDate, getTimeFromDate, unflattenData } from '@core/helpers';

import { ActivatedRoute } from '@angular/router';
import { ErrorResponse } from '@core/models/api';
import { Property } from '@core/models/listing';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { timeRangeValidator } from '@core/validators/time-range-validator.directive';
import { SelectItem } from 'primeng/api/public_api';
import { TimeSlot } from '@core/models/showings';
import { ROLES } from '@core/constants/auth';
import { HasRolePipe } from '@shared/pipes';

@Component({
  selector: 'app-schedule-appointment-modal',
  templateUrl: './schedule-appointment-modal.component.html',
  styleUrls: ['./schedule-appointment-modal.component.scss']
})
export class ScheduleAppointmentModalComponent implements OnInit, OnDestroy {

  availableTimeSlot: SelectItem [] = [];
  isMember: boolean = false;
  listing: Property;
  maxDate: Date;
  minDate: Date;
  selectedDate: Date;
  scheduleAppointmentForm: FormGroup;
  takenTimeSlot: TimeSlot [] = [];
  private unsubscribe: Subject<any> = new Subject();


  // convenience getter for form controls
   get f(): { [key: string]: AbstractControl } {
    return this.scheduleAppointmentForm.controls;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private dialogRef: MatDialogRef<ScheduleAppointmentModalComponent>,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private hasRole: HasRolePipe,
    private propertyService: PropertyService,
    private router: Router,
    private sessionService: SessionService,
    private appointmentService: AppointmentService
  ) {
    this.initializeForm();
    const today = new Date();
    this.minDate = today;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.unsubscribe)).subscribe((params) => {
      if (Object.keys(params).length !== 0) {
        this.listing = unflattenData(params);
        this.isMember = this.listing.homeappterMember === "true";
        this.scheduleAppointmentForm.patchValue({
          mlsNumber: this.listing.listingId,
        });
        if(this.isMember) {
          this.scheduleAppointmentForm.get('appointmentTime').setValidators([Validators.required]);
        } else {
          this.scheduleAppointmentForm.get('startTime').setValidators([Validators.required]);
          this.scheduleAppointmentForm.get('endTime').setValidators([Validators.required]);
          this.scheduleAppointmentForm.setValidators([timeRangeValidator()]);
        }

      }
    });
    this.scheduleAppointmentForm.controls['appointmentDate'].valueChanges.subscribe((date) => {
      if(date != null) {
        this.getScheduleTimeSlot(date);
        this.selectedDate = date;
      } else {
        this.availableTimeSlot = [];
      }
    });
    this.getScheduleTimeSlot(new Date());
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  initializeForm() {
    this.scheduleAppointmentForm = this.formBuilder.group({
      mlsNumber: [ { value: null, disabled: true }],
      appointmentDate:  [null,  [Validators.required]],
      appointmentTime: [null],
      startTime: [null],
      endTime: [null],
      message:  [null, [Validators.required]],
      manualRequest: [this.hasRole.transform(ROLES.ADMIN)],
      requestorMemberMLSID: [null],
      requestorName: [null],
      requestorOfficeName: [null],
      remarks: [null],
    });
  }

  onScheduleAppointment() {


    const formValues = this.scheduleAppointmentForm.value;
    const startTime = this.isMember ? formValues.appointmentTime.startDateTime : formValues.startTime;
    const endTime = this.isMember ? formValues.appointmentTime.endDateTime : formValues.endTime;

    const request = {
      ... formValues,
      appointmentDate: formatDate(formValues.appointmentDate),
      mlsNumber: this.listing.listingId,
      startTime: getTimeFromDate(startTime),
      endTime: getTimeFromDate(endTime)
    }
    this.appointmentService.schedule(request).subscribe(
      (res)=> {
        this.alertService.success('/home/listings', '', "Appointment successfully scheduled");
        this.dialogRef.close();
      },
      (err: ErrorResponse) => {
        console.log(err);
        // this.alertService.error(err);
      }
    )
  }

  private getScheduleTimeSlot(date: Date) {
    this.appointmentService.getAvailableTimeSlots(date, this.listing.listingId).subscribe(
      (res)=> {
        this.availableTimeSlot = [];
        this.takenTimeSlot = res.takenTimeSlot;
        const availableSlot: TimeSlot [] = res.availableTimeSlot;
        availableSlot.forEach((slot) => {
          this.availableTimeSlot.push({
            label: getTimeFromDate(slot.startDateTime)
                    + " - "
                    + getTimeFromDate(slot.endDateTime),
            value: slot
          })
        })
      },
      (err: ErrorResponse) => {
        // this.alertService.error(err);
      }
    )
  }

}
