import { Input, OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DashboardDetailsResponse } from '@core/models/dashboard';
import { UserAppointmentStatResponse } from '@core/models/showings';

@Component({
  selector: 'app-count-overview',
  templateUrl: './count-overview.component.html',
  styleUrls: ['./count-overview.component.scss']
})
export class CountOverviewComponent implements OnInit, OnChanges {

  @Input() userAppointmentStatResponse: UserAppointmentStatResponse;

  overviewItems: {
    title: string;
    value: number;
    background: string;
    icon: string;
  } [] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userAppointmentStatResponse && this.userAppointmentStatResponse) {
      this.setOverviewItems();
    }
  }

  private setOverviewItems() {
    this.overviewItems = [
      {
        title: "Showing Request",
        value: this.userAppointmentStatResponse.showingRequest,
        background: '#5599d9',
        icon: "pi pi-calendar"
      },
      {
        title: "Appointment Request",
        value: this.userAppointmentStatResponse.appointmentRequest,
        background: '#e39840',
        icon: "pi pi-calendar-plus"
      },
      {
        title: "Total Agent Listing",
        value: this.userAppointmentStatResponse.totalAgentListings,
        background: '#b0b555',
        icon: "pi pi-book"
      },
      {
        title: "Total Agent Disabled Listing",
        value: this.userAppointmentStatResponse.totalAgentDisabledListings,
        background: '#668f42',
        icon: "pi pi-user-minus"
      },
      {
        title: "Total Draft Listing",
        value: this.userAppointmentStatResponse.totalAgentDraftListings,
        background: '#c91854',
        icon: "pi pi-file"
      },
      {
        title: "Total Agent Updated Listing",
        value: this.userAppointmentStatResponse.totalAgentUpdatedListings,
        background: '#a2a391',
        icon: "pi pi-user"
      }
    ]
  }

}
