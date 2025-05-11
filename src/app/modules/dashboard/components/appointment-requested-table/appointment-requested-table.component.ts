import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AppointmentCountDetails } from '@core/models/dashboard';
import { Column, Table } from '@core/models/table';
import * as _ from 'lodash';

@Component({
  selector: 'app-appointment-requested-table',
  templateUrl: './appointment-requested-table.component.html',
  styleUrls: ['./appointment-requested-table.component.scss']
})
export class AppointmentRequestedTableComponent implements OnInit, OnChanges {

  @Input() appointmentCountDetails: AppointmentCountDetails;
  @Input() caption: string;
  @Input() requestType: string;
  countDetails: {
    scheduleFor: string;
    pending: string;
    confirmed: string;
  } [] = [];
  columns: Column [] = [];
  table: Table<{
    scheduleFor: string;
    pending: string;
    confirmed: string;
  }>;

  constructor() { }

  ngOnInit(): void {
    this.columns = [
      {
        dataField: "scheduleFor",
        dataType: "string",
      },
      {
        dataField: "pending",
        dataType: "number",
      },
      {
        dataField: "confirmed",
        dataType: "number",
      }
    ];
    this.table= {
      columns: this.columns,
      rows: []
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.appointmentCountDetails && this.appointmentCountDetails) {
     this.setTableDetails();
    }
  }

  setTableDetails() {
    Object.keys(this.appointmentCountDetails).map((key)=> {
      this.countDetails.push({
        scheduleFor: _.startCase(key),
        pending: this.appointmentCountDetails[key]['pending'],
        confirmed: this.appointmentCountDetails[key]['confirmed'],
      });
    });
    this.table.rows = this.countDetails;
  }

}
