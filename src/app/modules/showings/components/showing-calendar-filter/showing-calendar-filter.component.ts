import { AppointmentResponse, AppointmentStatus, CalendarMode, DateRange, MemberResponse } from '@core/models/showings';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AppointmentService } from '@core/http';
import { FullCalendarFilterService } from '@core/services/full-calendar-filter.service';
import { SelectItem } from 'primeng/api';
import { dateToString } from '@core/helpers';

@Component({
  selector: 'app-showing-calendar-filter',
  templateUrl: './showing-calendar-filter.component.html',
  styleUrls: ['./showing-calendar-filter.component.scss']
})
export class ShowingCalendarFilterComponent implements OnInit {

  appointmentStatuses: { name: string, value: AppointmentStatus} []  = [];
  calendarModes: { name: string, value: CalendarMode } [];
  fetchedDates: DateRange;
  iHaveRequestedList: SelectItem [] = [];
  onMyListingsList: SelectItem [] = [];
  selectedCalendarMode: CalendarMode;
  selectedDate: Date;
  selectedEventType: string;
  showingsCalendarFilterForm: FormGroup;
  mapDates: Map<string,Date>  = new Map<string,Date> ();

  constructor(
    private fullCalendarFilterService: FullCalendarFilterService,
    private appointmentService: AppointmentService
  ) {
    this.showingsCalendarFilterForm = new FormGroup({
      calendarMode: new FormControl(CalendarMode.MONTH),
      selectedDateRange: new FormControl(null),
      onMyListings: new FormControl(''),
      iHaveRequested:  new FormControl(''),
      statuses: new FormControl([
        AppointmentStatus.REQUESTED,
        AppointmentStatus.CONFIRMED,
        AppointmentStatus.CANCELLED
      ]),
    });
  }

  ngOnInit(): void {
    this.selectedDate = new Date();
    const startDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 1);
    const endDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 0);
    this.getEvents(startDate, endDate);

    this.calendarModes = [
      { name : 'Month', value: CalendarMode.MONTH},
      { name : 'Week', value: CalendarMode.WEEK},
      { name : 'Day', value: CalendarMode.DAY},
    ];
    this.appointmentStatuses = [
      { name: 'Requested', value: AppointmentStatus.REQUESTED },
      { name: 'Confirmed', value: AppointmentStatus.CONFIRMED },
      { name: 'Cancelled/Declined', value: AppointmentStatus.CANCELLED },
    ];
    this.onMyListingsList = [
      { label: 'On My Listings', value: 'onMyListings' },
      { label: 'I have requested', value: 'iRequested' },
    ];
    this.iHaveRequestedList = [
      { label: 'On My Listings', value: 'onMyListings' },
      { label: 'I have requested', value: 'iRequested' },
    ];
    this.showingsCalendarFilterForm.valueChanges.subscribe((val) => {
      this.fullCalendarFilterService.setFullCalendarFilter(val);
    });
    this.fullCalendarFilterService.calendarViewSubject.subscribe((view) => {
      if(view) {
        this.selectedCalendarMode = view;
      }
    });
    this.fullCalendarFilterService.calendarViewToTodaySubject.subscribe((today) => {
      if(today) {
        this.selectedDate = today;
      }
    });
    this.fullCalendarFilterService.requestingAgentsSubject.subscribe((agents) => {
      if(agents) {
        const listAgents: MemberResponse [] = agents;
        const requesting: MemberResponse [] = listAgents.filter(a => a.appointmentType == "REQUEST");
        const requestingToYou: MemberResponse [] = listAgents.filter(a => a.appointmentType == "APPOINTMENT");

        this.iHaveRequestedList = requesting.map( p=> ({
          label: p.fullName,
          value: p.hostMemberMlsId
        }));
        this.iHaveRequestedList.unshift({ value: '', label: 'All' });


        this.onMyListingsList = requestingToYou.map( p=> ({
          label: p.fullName,
          value: p.hostMemberMlsId
        }));


        this.onMyListingsList.unshift({ value: '', label: 'All' });
      }
    });
    this.appointmentService.getAppointmentsUpdates$().subscribe((update: boolean) => {
      if(update && this.fetchedDates) {
        this.getEvents(this.fetchedDates.startDate, this.fetchedDates.endDate)
      }
    });
  }

  onSelectAllEventTypes() {
    this.showingsCalendarFilterForm.controls['onMyListings'].enable();
    this.showingsCalendarFilterForm.controls['iHaveRequested'].enable();
  }

  onSelectAllStatus() {
    this.showingsCalendarFilterForm.controls['statuses'].setValue([
      AppointmentStatus.REQUESTED,
      AppointmentStatus.CONFIRMED,
      AppointmentStatus.CANCELLED
    ]);
  }

  onViewChange(event: DateRange) {
    this.fetchedDates = {
      startDate: event.startDate,
      endDate: event.endDate
    }
    this.getEvents(event.startDate, event.endDate);
  }

  private getEvents(startDate: Date, endDate: Date) {
    this.appointmentService
      .getAppointmentsByagent(startDate, endDate)
    .subscribe((res) => {
      this.mapResultsToCalendarEvent(res.appointmentList);
    });
  }

  private mapResultsToCalendarEvent(appointments: AppointmentResponse[]) {
    this.mapDates.clear();
    const tempMapDates: Map<string, Date> = new  Map<string, Date>();
    appointments.forEach((appointment) => {
      tempMapDates.set(dateToString(new Date(appointment.date)), new Date(appointment.date));
    });
    this.mapDates =  tempMapDates;
  }
}
