import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminService, AuthService, PropertyService } from './http';
const http = [
  AuthService, PropertyService, AdminService
];

import { AuthGuard, UnauthGuard } from './guards';
const guards = [AuthGuard, UnauthGuard];

import { AlertService, DialogService, FullCalendarFilterService, PreviousRouteService, SessionService } from './services';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor, HttpXsrfInterceptor, JwtTokenInterceptor } from './interceptors';

const services = [AlertService, SessionService, DialogService, PreviousRouteService, FullCalendarFilterService];

import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig, DialogService as primengDialogService} from 'primeng/dynamicdialog';
import { NgxSpinnerService } from 'ngx-spinner';
const primengServices = [MessageService, ConfirmationService, primengDialogService, DynamicDialogRef, DynamicDialogConfig, NgxSpinnerService];




@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true },

    ...guards,
    ...http,
    ...services,
    ...primengServices
  ],
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class CoreModule { }
