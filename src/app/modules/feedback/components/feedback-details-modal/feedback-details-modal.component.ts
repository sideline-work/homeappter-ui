import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { unflattenData } from '@core/helpers';
import { PropertyService } from '@core/http';
import { Feedback, FeedbackAppointmentInfo } from '@core/models/feedback';
import { Column, Table } from '@core/models/table';
import { SessionService } from '@core/services';
import { timeRangeValidator } from '@core/validators/time-range-validator.directive';
import { ListingDetailsModalComponent } from '@modules/listings/components/listing-details-modal/listing-details-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-feedback-details-modal',
  templateUrl: './feedback-details-modal.component.html',
  styleUrls: ['./feedback-details-modal.component.scss']
})
export class FeedbackDetailsModalComponent implements OnInit, OnDestroy {

  columns: Column [] = [];
  feedbackAppointmentInfo: FeedbackAppointmentInfo;
  table: Table<Feedback>;
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {listingId: number},
    private dialogRef: MatDialogRef<FeedbackDetailsModalComponent>,
    private propertyService: PropertyService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.unsubscribe)).subscribe((params) => {
      if (Object.keys(params).length !== 0) {
        this.feedbackAppointmentInfo = unflattenData(params);
        this.table = {} as Table<Feedback>;
        this.setColumns();
        this.table.rows = this.feedbackAppointmentInfo.feedback;
        console.log(this.feedbackAppointmentInfo);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }


  private setColumns() {
    this.columns = [
      {
        dataField: "question",
        dataType: "string",
        headerText: "Question(s)",
      },
      {
        dataField: "answer",
        dataType: "string",
        headerText: " "
      }
    ];
    this.table.columns = this.columns;
  }
}
