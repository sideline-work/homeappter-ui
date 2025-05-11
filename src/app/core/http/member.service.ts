import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '@environments/environment';
import { UserDetails } from '@core/models/session';
import { map } from 'rxjs/operators';
import { UserAccountResponse } from '@core/models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) {}

  getAgent(memberMlsId: string): Observable<UserAccountResponse> {
    return this.http.get(`${env.apiUrl}/member/har/profile/` + memberMlsId) as Observable<UserAccountResponse>;
  }

  getMemberProfile(): Observable<UserAccountResponse> {
    return this.http.get(`${env.apiUrl}/member/profile`) as Observable<UserAccountResponse>;
  }

  getAgents(): Observable<UserAccountResponse[]> {
    return this.http.get(`${env.apiUrl}/member/user-service/profile/all`) as Observable<UserAccountResponse[]>;
  }

  searchUserByString(keyword: string) : Observable<any[]> {
    return this.http.get(`${env.apiUrl}/member/user-service/search?searchString=` + keyword) as Observable<any[]>;
  }

  updateProfile(member: UserAccountResponse) {
    return this.http.put(`${env.apiUrl}/member/update/profile`, member) as Observable<UserAccountResponse>;
  }

  updatePassword(newPassword: string) {
    return this.http.put(`${env.apiUrl}/member/update/password`, {
      password: newPassword
    }) as Observable<UserDetails>;
  }

}
