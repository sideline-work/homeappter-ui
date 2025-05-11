import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-showings',
  templateUrl: './calendar-showings.component.html',
  styleUrls: ['./calendar-showings.component.scss']
})
export class CalendarShowingsComponent implements OnInit {

  alertKey: string;

  constructor(private router: Router) {
    this.alertKey = this.router.url;
  }

  ngOnInit(): void {
  }

}
