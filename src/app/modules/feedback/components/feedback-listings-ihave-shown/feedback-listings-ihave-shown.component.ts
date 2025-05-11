import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '@core/http';
import { ErrorResponse } from '@core/models/api';
import { FeedbackAppointmentInfo } from '@core/models/feedback';
import { AlertService } from '@core/services';

@Component({
  selector: 'app-feedback-listings-ihave-shown',
  templateUrl: './feedback-listings-ihave-shown.component.html',
  styleUrls: ['./feedback-listings-ihave-shown.component.scss']
})
export class FeedbackListingsIHaveShownComponent implements OnInit {

  feedbackAppointmentInfo: FeedbackAppointmentInfo [] = [];

  constructor(
    private alertService: AlertService,
    private feedbackService: FeedbackService,
  ) { }

  ngOnInit(): void {
    this.getFeedbackDetails();
  }

  private getFeedbackDetails() {
    const type: string = 'listingsIHaveShown';
    this.feedbackService.getFeedbackAppointmentInfos(type).subscribe(
      (res)=> {
        this.feedbackAppointmentInfo = res;
        console.log()
      },
      (err: ErrorResponse) => {
        console.log(err);
        this.alertService.error(err, { key: '/home/feedback', includeGlobalAlerts: false});
      },
      () => {
        console.log('success');
        // if(isSendEmail) {
        //   this.sendInstructionsToEmail();
        // }
      }
    );
  }

}
