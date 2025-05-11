import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '@core/http';
import { ErrorResponse } from '@core/models/api';
import { FeedbackAppointmentInfo } from '@core/models/feedback';
import { AlertService } from '@core/services';

@Component({
  selector: 'app-feedback-on-my-listing',
  templateUrl: './feedback-on-my-listing.component.html',
  styleUrls: ['./feedback-on-my-listing.component.scss']
})
export class FeedbackOnMyListingComponent implements OnInit {

  feedbackAppointmentInfo: FeedbackAppointmentInfo [] = [];

  constructor(
    private alertService: AlertService,
    private feedbackService: FeedbackService,
  ) { }

  ngOnInit(): void {
    this.getFeedbackDetails();
  }

  private getFeedbackDetails() {
    const type: string = 'onMyListing';
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
