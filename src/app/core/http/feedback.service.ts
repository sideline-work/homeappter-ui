import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { buildHttpParams } from '@core/helpers';
import { FeedbackAppointmentInfo, FeedbackQuestion, FeedbackRequest } from '@core/models/feedback';
import { environment as env } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) {}


  getFeedbackQuestions(token: string): Observable<FeedbackQuestion[]> {
    // return this.http.get(`${env.apiUrl}/member/har/profile/` + memberMlsId) as Observable<any[]>;
    return this.http.get('/assets/getFeedbackQuestions.json') as Observable<FeedbackQuestion[]>;
  }

  getFeedbackAppointmentInfos(type: string): Observable<FeedbackAppointmentInfo[]> {
  //  return this.http.get('/assets/getFeedbackAppointmentInfo.json') as Observable<FeedbackAppointmentInfo[]>;
	const params= {
      type: type
    };
    return this.http.get(`${env.apiUrl}/appointment/getFeedbackAppointmentInfo`, {
      params: buildHttpParams(params)
    }) as Observable<FeedbackAppointmentInfo[]>;
  }

  savedFeedback(request: FeedbackRequest): Observable<any> {
    // return this.http.get('/assets/getFeedbackQuestions.json') as Observable<any>;
    //return this.http.post(`http://localhost:9092/v1/appointment/savedFeedback`, request ) as Observable<any>
    return this.http.post(`${env.apiUrl}/appointment/savedFeedback`, request ) as Observable<any>
  }

}
