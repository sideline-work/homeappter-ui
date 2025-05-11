import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TimeSlot } from '@core/models/showings';
import dayGridPlugin from '@fullcalendar/daygrid';
import { flattenData, getDateFromTime, getTimeFromDate } from '@core/helpers';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendar } from 'primeng/fullcalendar';
import { EventInput } from '@fullcalendar/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-day-calendar-view',
  templateUrl: './day-calendar-view.component.html',
  styleUrls: ['./day-calendar-view.component.scss']
})
export class DayCalendarViewComponent implements OnInit, OnChanges {

  @Input() date: Date;
  @Input() takenTimeSlot: TimeSlot[] = [];

  @ViewChild('fc') fc: FullCalendar;


  events: any[] = [];
  options: any;

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      selectable: false,
      height: '80vh',
      defaultView: 'timeGridDay',
      defaultDate: null,
      header: {
        left:   '',
        center: 'title',
        right:  ''
      },
      eventTimeFormat: {
        hour: "numeric",
        minute: "2-digit",
        meridiem: "long",
      },
      editable: false,
      eventClick: (info) => {

      },
      displayEventTime: true,
      eventMouseEnter: (info) => {

      },
      datesRender: (view) => {

      }
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.date && this.date) {
      this.gotoDate(this.date);
    }
    if (changes.takenTimeSlot && this.takenTimeSlot) {
      //this.options = {...this.options, defaultDate: this.date};
      this.events =  this.mapResultsToCalendarEvent();
    }
  }

  private gotoDate(date: Date) {
    if(this.fc.calendar) {
      this.fc.calendar.gotoDate(new Date(date));
    }
  }

  private mapResultsToCalendarEvent(): EventInput[] {
    const events: EventInput[] = [];
    for (const event of this.takenTimeSlot) {
      events.push({
        id: event.startDateTime + "=" + event.endDateTime,
        //title: this.datePipe.transform(event.startDateTime, 'h:mm a') + " - " + this.datePipe.transform(event.endDateTime, 'h:mm a'),
        //date: new Date(event.startDateTime),
        start: new Date(event.startDateTime),
        end: new Date(event.endDateTime),
        extendedProps: {
          timeSlot: event
        },
      });
    }
    return events;
  }

}
