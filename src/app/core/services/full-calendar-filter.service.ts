import { FullCalendarFilter, MemberResponse } from '@core/models/showings';

import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullCalendarFilterService {

  public currentFullCalendarFilterSubject;
  public currentFullCalendarFilter: Observable<FullCalendarFilter>;

  public requestingAgentsSubject;
  public requestingAgents: Observable<MemberResponse[]>;

  public calendarViewSubject;
  public calendarView: Observable<string>;

  public calendarViewToTodaySubject;
  public calendarViewToToday: Observable<Date>;

  constructor() {
    this.currentFullCalendarFilterSubject  = new BehaviorSubject<FullCalendarFilter>(null);
    this.currentFullCalendarFilter  = this.currentFullCalendarFilterSubject.asObservable();
    this.requestingAgentsSubject  = new BehaviorSubject<MemberResponse[]>([]);
    this.requestingAgents = this.requestingAgentsSubject.asObservable();
    this.calendarViewSubject = new BehaviorSubject<string>(null);
    this.calendarView = this.calendarViewSubject.asObservable();
    this.calendarViewToTodaySubject = new BehaviorSubject<Date>(null);
    this.calendarViewToToday = this.calendarViewToTodaySubject.asObservable();
  }

  setFullCalendarFilter(filter: FullCalendarFilter) {
    this.currentFullCalendarFilterSubject.next(filter);
  }

  setRequestingAgents(agents: MemberResponse[]) {
    this.requestingAgentsSubject.next(agents);
  }

  setCalendarView(view: string) {
    this.calendarViewSubject.next(view);
  }

  setCalendarViewToToday(today: Date) {
    this.calendarViewToTodaySubject.next(today);
  }

}
