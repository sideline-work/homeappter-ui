import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@core/http';
import { ErrorResponse } from '@core/models/api';
import { Notification } from '@core/models/dashboard';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {

  @Input() notifications: Notification [] = [];

  notificationss: Notification [] = [];


  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.dashboardService.getNotifications().subscribe(
      (res)=> {
        this.notificationss = res;
        console.log()
      },
      (err: ErrorResponse) => {
        // console.log(err);
        // this.alertService.error(err);
      },
      () => {
        console.log('success');
        // if(isSendEmail) {
        //   this.sendInstructionsToEmail();
        // }
      }
    );
  }

}
