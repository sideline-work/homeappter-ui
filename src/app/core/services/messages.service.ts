import { Injectable } from '@angular/core';
import { FullCalendarFilter } from '@core/models/showings';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {


  public showMessageSubject;
  public showMessage: Observable<string>;


  public refreshRoomsSubject;
  public refreshRooms: Observable<string>;


  constructor() {
    this.showMessageSubject  = new BehaviorSubject<string>(null);
    this.showMessage  = this.showMessageSubject.asObservable();
    this.refreshRoomsSubject  = new BehaviorSubject<string>(null);
    this.refreshRooms  = this.showMessageSubject.asObservable();
   }

  loadSubject(filter: FullCalendarFilter) {
    this.showMessageSubject.next(filter);
  }

  updateRooms(filter: any) {
    this.refreshRoomsSubject.next(filter);
  }

}
