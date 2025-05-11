import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { flattenData, unflattenData } from '@core/helpers';
import { AppointmentService, PropertyService } from '@core/http';
import { ErrorResponse } from '@core/models/api';
import { FormView } from '@core/models/form';
import { Property } from '@core/models/listing';
import { LoginData } from '@core/models/session';
import { AlertService, DialogService, SessionService } from '@core/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { ROLES } from '@core/constants/auth';
import { PreferenceService } from '@core/http/preference.service';
import { ShowingInstruction } from '@core/models/listing/showing-instruction';
import { AppointmentResponse, AppointmentStatus } from '@core/models/showings';
import { UpdateOnAppointmentRequest } from '@core/models/showings/update-on-appointment-request';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-appointment-details-page',
  templateUrl: './appointment-details-page.component.html',
  styleUrls: ['./appointment-details-page.component.scss']
})
export class AppointmentDetailsPageComponent implements OnInit {

  readonly ROLES = ROLES;

  appointment: AppointmentResponse;
  remarks: string;
  showingInstruction: ShowingInstruction;
  visible: boolean = false;

  private unsubscribe: Subject<any> = new Subject();


  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private dialogService: DialogService,
    private location: Location,
    private preferenceService: PreferenceService,
    private sessionService: SessionService,
    private appointmentService: AppointmentService,
    private spinner: NgxSpinnerService,

  ) {
   }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.unsubscribe)).subscribe((params) => {
      if (Object.keys(params).length !== 0) {
        this.appointment = unflattenData(params);
        this.getShowingInstruction();
      }
    });
  }

  private getShowingInstruction() {
    this.preferenceService.getShowingInstruction(this.appointment.mlsNumber).subscribe(
      (res)=> {
        this.showingInstruction = res;
        console.log(this.showingInstruction);
        this.spinner.hide();
        //this.visible = true;
        setTimeout(() => {
          this.visible = true;
        }, 50);
        // this.alertService.success('/home/showings', '', res.message);
        // this.dialogRef.close();
      },
      (err: ErrorResponse) => {
        console.log(err);
        // this.alertService.error(err);
      }
    );
  }


  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onCancelAppointment() {
    const req: UpdateOnAppointmentRequest = {
      appointmentId: this.appointment.appointmentId,
      requestStatus: this.appointment.requestStatus,
      appointmentStatus: AppointmentStatus.CANCELLED,
      remarks: this.remarks
    }
    this.appointmentService.cancelAppointment(req, this.appointment.refId).subscribe(
      (res)=> {
        this.alertService.success('/home/showings', '', res.message); //  /home/dashboard
      },
      (err: ErrorResponse) => {
        this.alertService.error(err, {key: null, includeGlobalAlerts: false});
      }
    );
  }


  onHide() {

  }

  onClose() {
    this.visible = false;
    setTimeout(() => {
         this.location.back();
    }, 30);
  }


}
