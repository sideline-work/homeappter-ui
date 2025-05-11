import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env } from '@environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildHttpParams, formatDate } from '@core/helpers';
import { AppointmentResponse, ScheduleTimeSlotResponse, SendEmailRequest, UpdateAppointmentResponse, UserAppointmentStatResponse } from '@core/models/showings';
import { AppointmentListResponse } from '@core/models/showings/appointment-list-response';
import { UpdateOnAppointmentRequest } from '@core/models/showings/update-on-appointment-request';
import { GenericResponse } from '@core/models/api';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private appointmentListSubject = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  cancelAppointment(appointment: UpdateOnAppointmentRequest, refId: string) {
    return this.http.put(`${env.apiUrl}/appointment/update/status?refId=`+ refId, appointment).pipe(
      map((res) => {
        this.appointmentListSubject.next(true);
        return res;
      })
    ) as Observable<UpdateAppointmentResponse>;
  }

  getAppointments() {
    return this.http.get(`${env.apiUrl}/appointment/all`) as Observable<AppointmentResponse[]>
  }

  getAppointmentsUpdates$(): Observable<boolean> {
    return this.appointmentListSubject.asObservable();
  }


  getAppointmentsByagent(startDate: Date, endDate: Date) {
    const params= {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate)
    };
    return this.http.get(`${env.apiUrl}/appointment/list`, {
      params: buildHttpParams(params)
    }) as Observable<AppointmentListResponse>
  }

  getAvailableTimeSlots(requestedDate: Date, mlsId: string) {
    const params= {
      requestDate: formatDate(requestedDate),
      mlsId: mlsId
    };
    return this.http.get(`${env.apiUrl}/appointment/getAvailableTimeSlots`, {
      params: buildHttpParams(params)
    }) as Observable<ScheduleTimeSlotResponse>
  }

  dashboardDetails() {
    return this.http.get(`${env.apiUrl}/appointment/home`) as Observable<UserAppointmentStatResponse>
  }

  schedule(appointment: any) {
    return this.http.post(`${env.apiUrl}/appointment/schedule`, appointment ) as Observable<AppointmentResponse>
  }

  updateStatus(appointment: UpdateOnAppointmentRequest, refId: string) {
    return this.http.put(`${env.apiUrl}/admin/`+ refId + `/action`, appointment ).pipe(
      map((res) => {
        this.appointmentListSubject.next(true);
        return res;
      })
    )  as Observable<UpdateAppointmentResponse>
  }

  sendEmail(request: SendEmailRequest) {
    return this.http.post(`${env.apiUrl}/admin/sendEmail`, request ) as Observable<any>
  }
}
