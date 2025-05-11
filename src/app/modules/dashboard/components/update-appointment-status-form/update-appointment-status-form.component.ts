import { APPOINTMENT_STATUSES, REQUEST_STATUSES } from '@core/constants/status';
import { AppointmentResponse } from '@core/models/showings';
import { Component, OnInit } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { SelectItem } from "primeng/api";
import { getDateFromTime } from '@core/helpers/get-date-from-time';

@Component({
  selector: 'app-update-appointment-status-form',
  templateUrl: './update-appointment-status-form.component.html',
  styleUrls: ['./update-appointment-status-form.component.scss']
})
export class UpdateAppointmentStatusFormComponent implements OnInit {

  @Input() appointment: AppointmentResponse;
  @Input() formGroupValue: FormGroup;

  appointmentStatuses: SelectItem [] = [];
  requestStatuses: SelectItem [] = [];



  constructor() { }

  ngOnInit(): void {
    this.appointmentStatuses = APPOINTMENT_STATUSES;
    this.requestStatuses = REQUEST_STATUSES;
  }

  getDateFromTime(time: string): any {
    if(time != null) {
      const hourMin: string []  = time.split(":");
      return new Date(this.appointment.date).setHours(parseInt(hourMin[0]), parseInt(hourMin[1]));
    }
  }

}
