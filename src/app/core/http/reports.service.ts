import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { buildHttpParams } from '@core/helpers';
import { environment as env } from '@environments/environment';
import { Observable } from 'rxjs';
import { PropReport } from '@core/models/listing';
import { AgentShowingReport } from '@core/models/showings';


@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) {}

  getListingData(startDate: String, endDate: String): Observable<PropReport> {
    const params= {
      startDate: startDate,
      endDate: endDate
    };
    return this.http.get(`${env.apiUrl}/listing/agentListingsReport`, {
      params: buildHttpParams(params)
    }) as Observable<PropReport>
    //return this.http.get('/assets/report.json') as Observable<PropReport>;
  }

  getShowingData(startDate: string, endDate: String): Observable<AgentShowingReport> {
    const params= {
      startDate: startDate,
      endDate: endDate
    };
    return this.http.get(`${env.apiUrl}/appointment/agentShowingReport`, {
      params: buildHttpParams(params)
    }) as Observable<AgentShowingReport>
    //return this.http.get('/assets/agentShowingReport.json') as Observable<AgentShowingReport>;
  }

  getShowingTotal(): Observable<any> {
    return this.http.get(`${env.apiUrl}/appointment/agentShowingTotal`) as Observable<any>
  }

}
