import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { unflattenData } from '@core/helpers';
import { AdminService, AppointmentService } from '@core/http';
import { ErrorResponse } from '@core/models/api';
import { AppointmentResponse, SendEmailRequest } from '@core/models/showings';
import { AlertService, DialogService, SessionService } from '@core/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-send-email-showing-instructions-modal',
  templateUrl: './send-email-showing-instructions-modal.component.html',
  styleUrls: ['./send-email-showing-instructions-modal.component.scss']
})
export class SendEmailShowingInstructionsModalComponent implements OnInit, OnDestroy {

  showingIntructionsForm: FormGroup;
  appointment: AppointmentResponse;

  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private alertService: AlertService,
    private appointmentService: AppointmentService,
    private dialogRef: MatDialogRef<SendEmailShowingInstructionsModalComponent>,
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
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onSendEmailShowingInstructions() {
    const formValues = this.showingIntructionsForm.value;
    const req: SendEmailRequest  = {
      appointmentId: this.appointment.appointmentId,
      refId: this.appointment.refId,
      email: formValues.email,
    }
    this.appointmentService.sendEmail(req).subscribe(
      (res)=> {
        //this.alertService.success('/home/dashboard', '', res.message);
        console.log(res);
        this.alertService.success('/home/dashboard', '', res.message);
        this.dialogRef.close();
      },
      (err: ErrorResponse) => {
        console.log(err);
        this.alertService.error(err);
      },
      () => {
        console.log('success');
        // if(isSendEmail) {
        //   this.sendInstructionsToEmail();
        // }
      }
    );
  }

  private initializeForm() {
    this.showingIntructionsForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      // appointmentStatus: [null, [Validators.required]],
      // remarks:  [null],
    });
  }

}
