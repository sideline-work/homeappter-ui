import { Injectable } from '@angular/core';
import { cloneDeep } from '@core/helpers';
import { AlertOptions } from '@core/models/alerts';
import { ErrorResponse } from '@core/models/api';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertsSubject = new Subject<AlertOptions>();

  constructor() {}

  clear(key?: string): void {
    this.setAlert({ key, clear: true });
  }

  error(error: ErrorResponse, opts?: { key?: string; includeGlobalAlerts?: boolean }): void {
    error = cloneDeep(error);
    const alert = Object.assign(error, opts, { type: 'error' }) as AlertOptions;
    if(alert.detail) {
      alert.summary = "";
    }
    this.setAlert(alert);
  }

  // info(detail: string, opts?: { key?: string; includeGlobalAlerts?: boolean }): void {
  //   const alert = Object.assign(detail, opts, { type: 'info' }) as AlertOptions;
  //   this.setAlert(alert);
  // }

  success(key: string, summary: string, detail: string) {
    this.setAlert({ key: key, type: 'success', summary: summary, detail: detail });
  }

  info(key: string, summary: string, detail: string) {
    this.setAlert({ key: key, type: 'info', summary: summary, detail: detail });
  }

  getAlerts(): Observable<AlertOptions> {
    return this.alertsSubject.asObservable();
  }

  private setAlert(alertOptions: AlertOptions): void {
    this.alertsSubject.next(alertOptions);
  }
}
