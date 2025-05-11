import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { ErrorResponse } from '@core/models/api';
import { HTTP_ERROR_STATUS } from '@core/constants/api';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private errorResponse: ErrorResponse;

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          this.errorResponse = this.mapHttpErrorResponse({
            statusCode: err.error.status,
            errorMessage: err.error.message,
          });
        }
        return throwError(this.errorResponse);
      })
    );
  }

  private mapHttpErrorResponse(event: { statusCode: number; errorMessage: string }): ErrorResponse {
    let errorStatus = '';
    switch (event.statusCode) {
      case 0:
        if (!window.navigator.onLine) {
          // the browser is offline
          errorStatus = HTTP_ERROR_STATUS.BROWSER_OFFLINE;
        } else {
          // the api is offline
          errorStatus = HTTP_ERROR_STATUS.API_OFFLINE;
        }
        return {
          summary: errorStatus,
          detail: 'Failed to contact the server',
          message: event.errorMessage
        };
      case 403:
        errorStatus = HTTP_ERROR_STATUS.ACCESS_DENIED;
        break;
      case 404:
        errorStatus = HTTP_ERROR_STATUS.PAGE_NOT_FOUND;
        break;
      case 500:
        errorStatus = HTTP_ERROR_STATUS.INTERNAL_SERVER_ERROR;
        break;
      default:
        errorStatus = HTTP_ERROR_STATUS.UNHANDLED_ERROR;
        break;
    }

    return {
      summary: errorStatus,
      detail: event.errorMessage,
      message: event.errorMessage
    };
  }
}
