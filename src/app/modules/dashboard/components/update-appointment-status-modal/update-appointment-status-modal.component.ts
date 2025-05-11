import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService, AppointmentService } from '@core/http';
import { AlertService, DialogService, SessionService } from '@core/services';
import { AppointmentResponse, AppointmentStatus } from '@core/models/showings';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ErrorResponse } from '@core/models/api';
import { MatDialogRef } from '@angular/material/dialog';
import { ROLES } from '@core/constants/auth';
import { Subject } from 'rxjs';
import { UpdateOnAppointmentRequest } from '@core/models/showings/update-on-appointment-request';
import { takeUntil } from 'rxjs/operators';
import { unflattenData } from '@core/helpers';
import { createLessThan } from 'typescript';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-update-appointment-status-modal',
  templateUrl: './update-appointment-status-modal.component.html',
  styleUrls: ['./update-appointment-status-modal.component.scss']
})
export class UpdateAppointmentStatusModalComponent implements OnInit, OnDestroy {

  readonly ROLES = ROLES;

  appointment: AppointmentResponse;
  updateAppointmentForm: FormGroup;


  private unsubscribe: Subject<any> = new Subject();


  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private alertService: AlertService,
    private appointmentService: AppointmentService,
    private dialogRef: MatDialogRef<UpdateAppointmentStatusModalComponent>,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
  ) {
    this.initializeForm();
   }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.unsubscribe)).subscribe((params) => {
      if (Object.keys(params).length !== 0) {
        this.appointment = unflattenData(params);
        this.updateAppointmentForm.patchValue({
          requestStatus: this.appointment.requestStatus,
          appointmentStatus: this.appointment.appointmentStatus,
        });
        this.updateAppointmentForm.markAsPristine();
      }
    });
  }


  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onUpdateAppointment() {
    const formValue = this.updateAppointmentForm.value;
    let isSendEmail: boolean = false;
    if(formValue.appointmentStatus == AppointmentStatus.CONFIRMED) {
      this.dialogService.openQuestionDialog({
        header:'',
        message: 'Send showing instructions?',
        rejectKey: 'NO',
        acceptKey: 'YES',
        onAccept: () => {
          isSendEmail = true;
          this.updateAppointmentStatus(formValue, isSendEmail);
        },
        onReject: () => {
          this.updateAppointmentStatus(formValue, isSendEmail);
        }
      });
    } else {
      this.updateAppointmentStatus(formValue, isSendEmail);
    }

  }

  private initializeForm() {
    this.updateAppointmentForm = this.formBuilder.group({
      requestStatus: [null, [Validators.required]],
      appointmentStatus: [null, [Validators.required]],
      remarks:  [null],
    });
  }

  private updateAppointmentStatus(formValue: any, isSendEmail: boolean) {
    this.alertService.clear();
    const reqBody: UpdateOnAppointmentRequest = {
      appointmentId: Number(this.appointment.appointmentId),
      requestStatus: formValue.requestStatus,
      appointmentStatus: formValue.appointmentStatus,
      remarks: formValue.remarks,
      sendEmail: formValue.appointmentStatus == AppointmentStatus.CONFIRMED && isSendEmail
    };
    this.appointmentService.updateStatus(reqBody, this.appointment.refId).subscribe(
      (res)=> {
        this.alertService.success('/home/dashboard', '', res.message);
        this.dialogRef.close();
      },
      (err: ErrorResponse) => {
        this.alertService.error(err, { key: '/home/dashboard', includeGlobalAlerts: false});
        this.dialogRef.close();
      },
      () => {
      }
    );
  }

}
