import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { flattenData } from '@core/helpers';
import { FeedbackAppointmentInfo } from '@core/models/feedback';
import { Column, Table } from '@core/models/table';

@Component({
  selector: 'app-feedback-listings-table',
  templateUrl: './feedback-listings-table.component.html',
  styleUrls: ['./feedback-listings-table.component.scss']
})
export class FeedbackListingsTableComponent implements OnInit, OnChanges {

  @Input() feedbackAppointmentInfo: FeedbackAppointmentInfo [] = [];

  table: Table<FeedbackAppointmentInfo>;
  columns: Column [] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.feedbackAppointmentInfo && this.feedbackAppointmentInfo) {
     this.table = {} as Table<FeedbackAppointmentInfo>;
     this.setColumns();
     this.setRows();
    }
  }

  getDate(appointmentDate: Date, hourMin: string): number {
    if(appointmentDate && hourMin) {
      const startHourMin: string []  = hourMin.split(":");
      const date: any = new Date(appointmentDate).setHours(parseInt(startHourMin[0]), parseInt(startHourMin[1]));
      return date;
    }
    return null;
  }

  onRowSelect(row: FeedbackAppointmentInfo) {
    const queryParams = flattenData(row);
    this.router.navigate(['/home/feedback/feedback-details'], { queryParams });
  }

  private setColumns() {
    this.columns = [
      {
        dataField: "showingDateTime",
        dataType: "templateRef",
        headerText: "Date and Time",
        colTemplateRefName: 'showingDateTimeTemplate',
        style: "width: 22%",
        // columnFilter: "date",
        // columnFilterHeader: "Date Picker",
        // columnFilterType: 'date'
      },
      {
        dataField: "listingDetails",
        dataType: "templateRef",
        headerText: "Listing Details",
        colTemplateRefName: 'listingDetailsTemplate',
        style: "width: 29%",
        // columnFilter: "date",
        // columnFilterHeader: "Date Picker",
        // columnFilterType: 'date'
      },
      {
        dataField: "agentDetails",
        dataType: "templateRef",
        headerText: "Agent Details",
        colTemplateRefName: 'agentDetailsTemplate',
        style: "width: 29%",
        // columnFilter: "date",
        // columnFilterHeader: "Date Picker",
        // columnFilterType: 'date'
      },
      {
        dataField: "thumbnail",
        dataType: "templateRef",
        headerText: " ",
        colTemplateRefName: 'thumbnailTemplate',
        style: "width: 20%",
      },
    ];
    this.table.columns = this.columns;
  }

  private setRows() {
    this.table.rows = this.feedbackAppointmentInfo;
  }




}
