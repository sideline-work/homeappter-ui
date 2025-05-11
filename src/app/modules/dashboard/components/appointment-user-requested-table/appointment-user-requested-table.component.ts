import { OnChanges, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { AppointmentCountDetails } from '@core/models/dashboard';
import * as _ from 'lodash';

@Component({
  selector: 'app-appointment-user-requested-table',
  templateUrl: './appointment-user-requested-table.component.html',
  styleUrls: ['./appointment-user-requested-table.component.scss']
})
export class AppointmentUserRequestedTableComponent implements OnInit {

  @Input() appointmentCountDetails: AppointmentCountDetails;

  constructor(){}

  ngOnInit(): void {
  }
}
