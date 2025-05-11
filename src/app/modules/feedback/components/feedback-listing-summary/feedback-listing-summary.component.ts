import { Component, Input, OnInit } from '@angular/core';
import { FeedbackAppointmentInfo } from '@core/models/feedback';

@Component({
  selector: 'app-feedback-listing-summary',
  templateUrl: './feedback-listing-summary.component.html',
  styleUrls: ['./feedback-listing-summary.component.scss']
})
export class FeedbackListingSummaryComponent implements OnInit {

  @Input() feedbackAppointmentInfo: FeedbackAppointmentInfo;

  constructor() { }

  ngOnInit(): void {
  }

  getDate(appointmentDate: Date, hourMin: string): number {
    if(appointmentDate && hourMin) {
      const startHourMin: string []  = hourMin.split(":");
      const date: any = new Date(appointmentDate).setHours(parseInt(startHourMin[0]), parseInt(startHourMin[1]));
      return date;
    }
    return null;
  }

}
