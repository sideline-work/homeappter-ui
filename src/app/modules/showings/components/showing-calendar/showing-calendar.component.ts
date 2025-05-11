import { AppointmentResponse, AppointmentStatus, CalendarMode, DateRange, FullCalendarFilter } from '@core/models/showings';
import { Component, OnInit, ViewChild } from '@angular/core';

import { AppointmentListResponse } from '@core/models/showings/appointment-list-response';
import { AppointmentService } from '@core/http';
import { ElementRef } from '@angular/core';
import { ErrorResponse } from '@core/models/api';
import { EventInput } from '@fullcalendar/core';
import { FullCalendar } from 'primeng/fullcalendar';
import { FullCalendarFilterService } from '@core/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import { flattenData } from '@core/helpers';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import tippy from 'tippy.js';

@Component({
  selector: 'app-showing-calendar',
  templateUrl: './showing-calendar.component.html',
  styleUrls: ['./showing-calendar.component.scss']
})
export class ShowingCalendarComponent implements OnInit {

  @ViewChild('fc') fc: FullCalendar;
  @ViewChild("tippyTemplate", { read: ElementRef, static: false }) tippyTemplate: ElementRef;

  events: any[] = [];
  initialEvents: any [] = [];
  options: any;
  selectedAppointmentToPreview: AppointmentResponse;
  showTippy: boolean = false;
  fetchedDates: DateRange;

  constructor(
    private elementRef:ElementRef,
    private fullCalendarFilterService: FullCalendarFilterService,
    private router: Router,
    private appointmentService: AppointmentService,
    private spinner: NgxSpinnerService
    ) {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.querySelector('.fc-today-button')
      .addEventListener('click', this.onClick.bind(this));
  }

  ngOnInit(): void {
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      selectable: false,
      height: '100%',
      defaultView: 'dayGridMonth',
      defaultDate: new Date(),
      header: {
          left: 'dayGridMonth,timeGridWeek,timeGridDay',
          center: 'title',
          right: 'today,prev,next'
      },
      eventTimeFormat: {
        hour: "numeric",
        minute: "2-digit",
        meridiem: "long",
      },
      editable: false,
      eventClick: (info) => {
        const queryParams = flattenData(info.event.extendedProps.appointment);
        this.router.navigate(['/home/showings/details/' + info.event.id], { queryParams });
      },
      displayEventTime: true,
      eventMouseEnter: (info) => {
        this.showTippy = true;

        const template = this.tippyTemplate.nativeElement;
        this.selectedAppointmentToPreview = info.event.extendedProps.appointment;
        tippy(info.el, {
          trigger: 'mouseenter',
          content: template,
          allowHTML: true,
          offset: [-190, 10],
        });
      },
      datesRender: (view) => {
        this.fullCalendarFilterService.setCalendarView(view.view.type);
        const startDate = view.view.activeStart;
        const endDate = view.view.activeEnd;
        if(this.fetchedDates) {
          const isStarDateWithinRange: boolean =  startDate >= this.fetchedDates.startDate && startDate <= this.fetchedDates.endDate;
          const isEndDateWithinRange: boolean =  endDate >= this.fetchedDates.startDate && endDate <= this.fetchedDates.endDate;
          if(!isStarDateWithinRange || !isEndDateWithinRange) {
            this.populateCalendar(startDate, endDate);
          }
        } else {
          this.populateCalendar(startDate, endDate);
        }
      }
    };
    this.fullCalendarFilterService.currentFullCalendarFilterSubject.subscribe((filter: FullCalendarFilter) => {
      if(filter && this.fc != null) {
        this.gotoDate(filter.selectedDateRange.startDate);
        this.processFilters(filter);
      }
    });
    this.appointmentService.getAppointmentsUpdates$().subscribe((update: boolean) => {
      if(update && this.fetchedDates) {
        this.populateCalendar(this.fetchedDates.startDate, this.fetchedDates.endDate);
      }
    });

  }

  private gotoDate(date: Date) {
    if(this.fc.calendar) {
      this.fc.calendar.gotoDate(new Date(date));
    }
  }

  private mapResultsToCalendarEvent(response: AppointmentListResponse): EventInput[] {
    this.fullCalendarFilterService.setRequestingAgents(response.memberList);

    const eventList: AppointmentResponse[] = response.appointmentList;
    const events: EventInput[] = [];
    for (const event of eventList) {
      const eventCalendarStyle = this.setEventStyles(event.appointmentStatus);

      const startHourMin: string []  = event.startTime.split(":");
      const endHourMin: string []  = event.endTime.split(":");
      events.push({
        id: event.appointmentId,
        title: event.appointmentInfo.fullAddress,
        date: new Date(event.date),
        start: new Date(event.date).setHours(parseInt(startHourMin[0]), parseInt(startHourMin[1])),
        end: new Date(event.date).setHours(parseInt(endHourMin[0]), parseInt(endHourMin[1])),
        display: eventCalendarStyle.display,
        className: eventCalendarStyle.className,
        extendedProps: {
          eventStatus: event.appointmentStatus,
          agentId: event.hostMemberMlsId,
          id: event.appointmentId,
          requestedAgent: event.requestByUid,
          requestType: event.requestType,
          appointment: event
        },
      });
    }
    return events;
  }

  private onClick(event) {
    this.fullCalendarFilterService.setCalendarViewToToday(new Date());
  }

  private populateCalendar(startDate: Date, endDate: Date) {
    this.spinner.show();

    this.appointmentService
      .getAppointmentsByagent(startDate, endDate).subscribe(
        (res) => {
          console.log(res);
          this.events =  this.mapResultsToCalendarEvent(res);
          this.initialEvents = this.events;
          this.spinner.hide();
          this.setFetchedDates(startDate, endDate);
        },
        (err: ErrorResponse) => {
          // this.alertService.error(err);
          this.spinner.hide();
        }
      );
  }

  private setFetchedDates(startDate: Date, endDate: Date) {
    this.fetchedDates = {
      startDate: startDate,
      endDate: endDate
    };
  }

  private processFilters(filter: FullCalendarFilter) {
    let filteredEvents = this.initialEvents.filter(event => {
      const isIncluded = filter.statuses.includes(event.extendedProps.eventStatus);
      return isIncluded;
    });

    //filter appointments with appointment request type
    const appointmentfilteredEvents = filteredEvents.filter(event => {
      const isIncluded = (
        (filter.onMyListings == event.extendedProps.appointment.requestByMlsId ||
        filter.onMyListings == '') &&
        event.extendedProps.requestType == 'APPOINTMENT'
      );
      return isIncluded;
    });

    // //filter appointments with requested request type
    const requestedfilteredEvents = filteredEvents.filter(event => {
      const isIncluded = (
        (filter.iHaveRequested == event.extendedProps.appointment.hostMemberMlsId ||
          filter.iHaveRequested == '') &&
          event.extendedProps.requestType == 'REQUEST'
      );
      return isIncluded;
    });

    const filteredList = appointmentfilteredEvents.push(...requestedfilteredEvents);
    this.events = [...appointmentfilteredEvents ];
  }

  private setEventStyles(eventType: string): any {
    let eventStyle;

    switch (eventType) {
      case AppointmentStatus.REQUESTED:
        eventStyle = Object.assign({
          display: 'background',
          className: 'fc-appointment fc-requested',
        });
        break;
      case AppointmentStatus.CONFIRMED:
        eventStyle = Object.assign({
          display: 'background',
          className: 'fc-appointment fc-confirmed',
        });
        break;
      case AppointmentStatus.CANCELLED:
        eventStyle = Object.assign({
          display: 'background',
          className: 'fc-appointment fc-cancelled',
        });
        break;
      default:
        eventStyle = Object.assign({
          display: '',
          className: null,
        });
        break;
    }
    return eventStyle;
  }


}
