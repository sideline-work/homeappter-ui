import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from '@core/models/dashboard';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements OnInit {

  @Input() notification: Notification;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onClickNotification(notification: Notification) {
    if(notification.refLink) {
      this.router.navigate([notification.refLink]);
    }
  }

}
