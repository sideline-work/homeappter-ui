import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@core/http';
import { SessionService } from '@core/services';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add authorization header with jwt token if available
      let currentUser = this.sessionService.currentUserValue;
      if (currentUser && currentUser.authToken) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${currentUser.authToken}`
                  //Authorization: `${currentUser.authToken}`
              }
          });
      }

      return next.handle(request);
  }
}
