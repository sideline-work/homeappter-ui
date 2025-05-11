import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Notification } from '@core/models/dashboard';

@Component({
  selector: 'app-notifications-card',
  templateUrl: './notifications-card.component.html',
  styleUrls: ['./notifications-card.component.scss']
})
export class NotificationsCardComponent implements OnInit {

  @Input() notifications: Notification [] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
