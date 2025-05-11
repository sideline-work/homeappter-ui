import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from '@core/http';
import { ErrorResponse } from '@core/models/api';
import { FeedbackAppointmentInfo } from '@core/models/feedback';
import { AlertService } from '@core/services';

@Component({
  selector: 'app-my-feedback',
  templateUrl: './my-feedback.component.html',
  styleUrls: ['./my-feedback.component.scss']
})
export class MyFeedbackComponent implements OnInit {

  alertKey: string;
  tab: number = 0;



  constructor(
    private router: Router
  ) {
    this.alertKey = this.router.url;
  }


  ngOnInit(): void {
  }



}
