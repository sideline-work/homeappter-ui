import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginData, LoginResponse } from '@core/models/session';

import { DashboardDetailsResponse } from '@core/models/dashboard';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from '@core/services';
import { environment as env } from '@environments/environment';
import { map } from 'rxjs/operators';
import { Notification } from '@core/models/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  getDashboardDetails(): Observable<DashboardDetailsResponse> {
    return this.http.get('/assets/getDashboardDetails.json') as Observable<DashboardDetailsResponse>;
    //return this.http.get(`${env.apiUrl}/listPropertyByAgentId/` + agentId) as Observable<GetListingsResponse>
  }

  getNotifications(): Observable<Notification []> {
    //return this.http.get('/assets/getNotifications.json') as Observable<Notification []>;
	   return this.http.get(`${env.apiUrl}/appointment/getNotifications`) as Observable<Notification []>;
  }
}
