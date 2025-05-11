import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '@environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginResponse, LoginData } from '@core/models/session';
import { SessionService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private sessionService: SessionService) {}

  public forgotPassword(email: string) {
    const body = {
      "email" : email,
    };
    return this.http.post<any>(`${env.apiUrl}/forgotPassword`, body)
      .pipe(map(res => {
          return res;
    }));
  }

  public login(memberMlsId: string, password: string): Observable<LoginResponse> {
    const body = {
      "memberMlsId" : memberMlsId,
      "password" : password
    };
    return this.http.post<LoginResponse>(`${env.apiUrl}/member/login`, body)
      .pipe(map(res => {
          localStorage.setItem('currentUser', JSON.stringify(res.data));
          localStorage.setItem('token', JSON.stringify(res.data.authToken));
          this.sessionService.currentUserSubject.next(res.data);
          return res;
    }));
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.sessionService.currentUserSubject.next(null);
    //TODO return this.http.post(`${env.apiUrl}/user/logout`, {}) as Observable<User>;
  }

  public register(request: any): Observable<any> {
    return this.http.post<any>(`${env.apiUrl}/member/registration`, request)
      .pipe(map(res => {
          return res;
    }));
  }

  public verifyMember(request: any): Observable<any> {
    return this.http.post<any>(`${env.apiUrl}/member/verify`, request) as Observable<any>;
  }

  public verifyOtp(otp: string): Observable<any> {
    return this.http.post<any>(`${env.apiUrl}/core/verify/otp/` + otp, null) as Observable<any>;
  }


}
