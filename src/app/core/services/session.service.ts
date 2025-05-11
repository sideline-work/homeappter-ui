import { Injectable } from '@angular/core';
import { LoginData } from '@core/models/session';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public currentUserSubject;
  public currentUser: Observable<any>;

  constructor() {
    this.currentUserSubject  = new BehaviorSubject<LoginData | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginData | null {
    return this.currentUserSubject.value;
  }

  public setCurrentUser(user: LoginData) {
    this.currentUserSubject.next(user);
  }

  public hasRole(role: string): boolean {
    if (this.currentUserValue) {
      return this.currentUserValue.role == role;
    }
    return false;
  }

  public isLoggedIn() {
    return this.currentUserValue != null;
  }

}
