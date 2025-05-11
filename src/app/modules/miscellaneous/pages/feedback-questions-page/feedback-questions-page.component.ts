import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROLES } from '@core/constants/auth';
import { unflattenData } from '@core/helpers';
import { FeedbackService } from '@core/http';
import { ErrorResponse } from '@core/models/api';
import { FeedbackQuestion, FeedbackRequest } from '@core/models/feedback';
import { AlertService } from '@core/services';
import { HasRolePipe } from '@shared/pipes';
import { DialogService } from '@core/services';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-feedback-questions-page',
  templateUrl: './feedback-questions-page.component.html',
  styleUrls: ['./feedback-questions-page.component.scss']
})
export class FeedbackQuestionsPageComponent implements OnInit {

  alertKey: string;
  appointmentId: string;
  feedbackQuestionsForm: FormGroup;
  mlsNumber: string;
  token : string;
  questions: FeedbackQuestion [];

  private sub: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private dialogService: DialogService,
    private feedbackService: FeedbackService,
    private hasRole: HasRolePipe,
    private router: Router
  ) {
    this.alertKey = this.router.url;
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.appointmentId = params['appointmentId'];
      this.mlsNumber = params['mlsNumber'];
      this.token = params['token'];
      this.getFeedbackQuestions();
   });
  }

  onSubmitFeedback() {
    var ans1 = (<HTMLInputElement>document.getElementById("id_1")).value;
    var ans2 = (<HTMLInputElement>document.getElementById("id_2")).value;
    var ans3 = (<HTMLInputElement>document.getElementById("id_3")).value;
    var ans4 = (<HTMLInputElement>document.getElementById("id_4")).value;
    var ans5 = (<HTMLInputElement>document.getElementById("id_5")).value;
    var ans6 = (<HTMLInputElement>document.getElementById("id_6")).value;

    const request: FeedbackRequest = {
      appointmentId: this.appointmentId,
      mlsNumber: this.mlsNumber,
      answer: [{"feedbackquestionId": 1, "answer": ans1},
             {"feedbackquestionId": 2, "answer": ans2},
             {"feedbackquestionId": 3, "answer": ans3},
             {"feedbackquestionId": 4, "answer": ans4},
             {"feedbackquestionId": 5, "answer": ans5},
             {"feedbackquestionId": 6, "answer": ans6}]
    }

    this.feedbackService.savedFeedback(request).subscribe(
      (res)=> {
        console.log(this.questions);
        this.navigateAfterSubmit();
        // console.log(res);
        // this.alertService.success('/home/dashboard', '', res.message);
        // this.dialogRef.close();
      },
      (err: ErrorResponse) => {
        console.log(err);
        this.alertService.error(err);
      },
      () => {
        console.log('success');
      }
    );
  }

  private getFeedbackQuestions() {
    this.feedbackService.getFeedbackQuestions(this.token).subscribe(
      (res)=> {
        this.questions = res;
        console.log(this.questions);
        // //this.alertService.success('/home/dashboard', '', res.message);
        // console.log(res);
        // this.alertService.success('/home/dashboard', '', res.message);
        // this.dialogRef.close();
      },
      (err: ErrorResponse) => {
        // console.log(err);
        // this.alertService.error(err);
      },
      () => {
        console.log('success');
        // if(isSendEmail) {
        //   this.sendInstructionsToEmail();
        // }
      }
    );
  }

  private navigateAfterSubmit() {
    if(this.hasRole.transform(ROLES.ADMIN) || this.hasRole.transform(ROLES.MEMBER)) {
      // this.alertService.success('/feedback', '', res.message);
      setTimeout(() => {
        this.dialogService.openInfoDialog({
          header:'Feedback Completed',
          message: 'We appreciate you taking the time to write a feedback',
          onAccept: () => {
            this.router.navigate(['/home']);
          },
        });
      }, 200);
    } else {
      //TODO: redirect to blank page wi
    }

  }

}
