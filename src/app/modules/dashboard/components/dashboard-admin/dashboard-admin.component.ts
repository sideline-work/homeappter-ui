import { APPOINTMENT_STATUSES, REQUEST_STATUSES } from '@core/constants/status';
import { AppointmentResponse, AppointmentStatus } from '@core/models/showings';
import { AppointmentService, DashboardService, MemberService } from '@core/http';
import { Column, Table } from '@core/models/table';
import { Component, OnInit } from '@angular/core';
import { SelectItem, SortEvent } from 'primeng/api';

import { ErrorResponse } from '@core/models/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { flattenData } from '@core/helpers';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { UserAccountResponse } from '@core/models/member';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

  readonly AppointmentStatus = AppointmentStatus;

  agents: SelectItem [] = [];
  agentsMap: Map<number, string> = new Map<number, string>();
  agentsMapComplete: Map<number, UserAccountResponse> = new Map<number, UserAccountResponse>();
  appointmentList: AppointmentResponse [];
  appointmentStatuses: SelectItem [] = [];
  columns: Column [] = [];
  customSortFields: string [] = [
    'appointmentDateFilter',
    'requestedAgent'
  ]
  table: Table<AppointmentResponse>;
  requestStatuses: SelectItem [] = [];

  constructor(
    private appointmentService: AppointmentService,
    private dashboardService: DashboardService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private memberService: MemberService,
    ) { }

  ngOnInit(): void {
    this.appointmentStatuses = APPOINTMENT_STATUSES;
    this.requestStatuses = REQUEST_STATUSES;
    this.getAllData();
    this.appointmentService.getAppointmentsUpdates$().subscribe((update: boolean) => {
      if(update) {
        this.getAllData();
      }
    });
  }

  getDate(appointmentDate: Date, hourMin: string): number {
    if(appointmentDate && hourMin) {
      const startHourMin: string []  = hourMin.split(":");
      const date: any = new Date(appointmentDate).setHours(parseInt(startHourMin[0]), parseInt(startHourMin[1]));
      return date;
    }
    return null;
  }

  onCustomSort(event: { event: SortEvent, firstData: any, secondData: any, firstValue: any, secondValue: any, func: Function}) {
    const field = event.event.field;
    if(field == 'appointmentDateFilter') {
      if(event.firstData.date != event.secondData.date) {
        event.func(event.firstValue > event.secondValue ? 1: -1);
      } else {
        event.func(event.firstData.startTime.localeCompare(event.secondData.startTime));
      }
    }
    if(field == 'requestByUid') {
      if(event.firstValue != event.secondValue) {
        const firstAgentName = this.agentsMap.get(event.firstValue);
        const secondAgentName = this.agentsMap.get(event.secondValue);
        event.func(firstAgentName.localeCompare(secondAgentName));
      } else {
        event.func(0);
      }
    }
  }

  onScheduleAppointmentLink() {
    this.router.navigate(['/home/listings'], {
      state: {
        tab: 1 // search listing tab
      },
    });
  }

  onSendShowingInstructions(row: AppointmentResponse) {
    const queryParams = flattenData(row);
    this.router.navigate(['/home/dashboard/send-instructions'], { queryParams });
  }

  onUpdateStatus(row: AppointmentResponse) {
    const queryParams = flattenData(row);
    this.router.navigate(['/home/dashboard/update-status/' + row.appointmentId], { queryParams });
  }

  onViewAppointmentDetails(row: AppointmentResponse) {
    const queryParams = flattenData(row);
    this.router.navigate(['/home/dashboard/details/' + row.appointmentId], { queryParams });
  }

  private setColumns() {
    this.columns = [
      {
        dataField: "appointmentId",
        dataType: "number",
        headerText: "Id",
        style: "width: 4%"
      },
      {
        dataField: "ticketId",
        dataType: "number",
        headerText: "Ticket Number",
        style: "width: 8%"
      },
      {
        dataField: "requestByUid",
        dataType: "templateRef",
        colTemplateRefName: 'requestByUidTemplate',
        style: "width: 14%",
        headerText: "Requested By",
        columnFilter: "requestByUid",
        columnFilterHeader: "Agent Picker",
        columnFilterOptions: this.agents,
        columnFilterType: 'multiselect'
      },
      {
        dataField: "appointmentInfo.fullAddress",
        dataType: "nestedObject",
        headerText: "Address",
        style: "width: 19%",
        wrap: true
      },
      {
        dataField: "appointmentDateFilter",
        dataType: "templateRef",
        headerText: "Appointment Date",
        colTemplateRefName: 'dateTemplate',
        style: "width: 16%",
        columnFilter: "date",
        columnFilterHeader: "Date Picker",
        columnFilterType: 'date'
      },
      {
        dataField: "source",
        //dataType: "nestedObject",
        dataType: "string",
        headerText: "Source",
        style: "width: 8%"
      },
      {
        dataField: "appointmentStatus",
        dataType: "templateRef",
        colTemplateRefName: 'apppointmentStatusTemplate',
        style: "width: 14%",
        headerText: "Appointment Status",
        columnFilter: "appointmentStatus",
        columnFilterHeader: "Appointment Status Picker",
        columnFilterOptions: this.appointmentStatuses,
        columnFilterType: 'multiselect'
      },
      {
        dataField: "requestStatus",
        dataType: "templateRef",
        colTemplateRefName: 'requestStatusTemplate',
        style: "width: 14%",
        headerText: "Request Status",
        columnFilter: "requestStatus",
        columnFilterHeader: "Ticker Status Picker",
        columnFilterOptions: this.requestStatuses,
        columnFilterType: 'multiselect'
      },
      {
        dataField: "view/Update",
        dataType: "templateRef",
        colTemplateRefName: 'viewButtonTemplate',
        textAlign: "center",
        style: "width: 9%"
      },
      {
        dataField: "Send Instructions",
        dataType: "templateRef",
        colTemplateRefName: 'sendInstructionsButtonTemplate',
        textAlign: "center",
        style: "width: 13%"
      },
    ];
    this.table.columns = this.columns;
  }

  private getAllData() {
    this.spinner.show();

    forkJoin({
      appointments:  this.appointmentService.getAppointments(),
      agents: this.memberService.getAgents()
    })
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(
        (res) => {
          this.table = {} as Table<AppointmentResponse>;
          if (res.appointments) {
            this.appointmentList = res.appointments.map(p => ({
              ...p,
              appointmentDateFilter: new Date(p.date)
            }));
            this.table.rows = this.appointmentList;

          }
          if (res.agents) {
            this.agents = res.agents.map( p=> ({
              label: p.fullname,
              value: p.uid
            }));
            this.agents.forEach(p => {
              this.agentsMap.set(p.value, p.label);
            });
            res.agents.forEach(p => {
              this.agentsMapComplete.set(p.uid, p);
            });
            console.log(this.agentsMapComplete);
            this.setColumns();
          }
        },
        (err: ErrorResponse) => {
          this.spinner.hide();
        }
      );
  }

}
