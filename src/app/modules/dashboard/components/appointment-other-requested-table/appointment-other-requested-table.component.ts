import { OnChanges, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { AppointmentCountDetails } from '@core/models/dashboard';
import { Column, Table } from '@core/models/table';
import * as _ from 'lodash';

@Component({
  selector: 'app-appointment-other-requested-table',
  templateUrl: './appointment-other-requested-table.component.html',
  styleUrls: ['./appointment-other-requested-table.component.scss']
})
export class AppointmentOtherRequestedTableComponent implements OnInit {

  @Input() appointmentCountDetails: AppointmentCountDetails;

  constructor(){}

  ngOnInit(): void {
  }
}
