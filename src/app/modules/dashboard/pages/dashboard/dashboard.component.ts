import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@core/http';
import { ErrorResponse } from '@core/models/api';
import { DashboardDetailsResponse } from '@core/models/dashboard';
import { NgxSpinnerService } from 'ngx-spinner';
import { ROLES } from '@core/constants/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  readonly ROLES = ROLES;

  alertKey: string;

  constructor(private router: Router) {
    this.alertKey = this.router.url;
  }

  ngOnInit(): void {
  }

}
