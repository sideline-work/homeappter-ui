import { Component, Input, OnInit } from '@angular/core';

import { AppointmentResponse } from '@core/models/showings';
import { getDateFromTime } from '@core/helpers/get-date-from-time';

@Component({
  selector: 'app-appointment-preview',
  templateUrl: './appointment-preview.component.html',
  styleUrls: ['./appointment-preview.component.scss']
})
export class AppointmentPreviewComponent implements OnInit {

  @Input() appointment: AppointmentResponse;

  constructor() { }

  ngOnInit(): void {
  }

  getDateFromTime(time: string): any {
    if(time != null) {
      const hourMin: string []  = time.split(":");
      return new Date(this.appointment.date).setHours(parseInt(hourMin[0]), parseInt(hourMin[1]));
    }
  }


}
