import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService, DashboardService } from '@core/http';
import { ErrorResponse } from '@core/models/api';
import { DashboardDetailsResponse } from '@core/models/dashboard';
import { UserAppointmentStatResponse } from '@core/models/showings';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {

  userAppointmentStatResponse: UserAppointmentStatResponse;

  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private dashboardService: DashboardService
    ) { }

  ngOnInit(): void {
    this.getNotificationDetails();
  }

  getNotificationDetails() {
    this.spinner.show();
    this.appointmentService.dashboardDetails().subscribe(
      (res) => {
        this.userAppointmentStatResponse = res;
        this.spinner.hide();
      },
      (err: ErrorResponse) => {
        this.spinner.hide();
        // this.alertService.error(err);
      }
    );
  }

  onScheduleAppointmentLink() {
    this.router.navigate(['/home/listings'], {
      skipLocationChange: true,
      state: {
        tab: 1 // search listing tab
      },
    });
  }


}
