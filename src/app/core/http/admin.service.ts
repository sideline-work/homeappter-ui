import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateAppointmentResponse } from '@core/models/showings';
import { UpdateOnAppointmentRequest } from '@core/models/showings/update-on-appointment-request';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  updateStatus(appointment: UpdateOnAppointmentRequest) {
    return this.http.put('/v1/admin/appointment/{refId}/action', appointment) as Observable<UpdateAppointmentResponse>;
  }
}
