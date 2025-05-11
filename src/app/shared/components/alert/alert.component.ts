import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GLOBAL_ALERTS } from '@core/constants/alerts';
import { AlertService } from '@core/services/alert.service';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() alertKey?: string = this.router.url;

  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private alertService: AlertService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.alertService
      .getAlerts()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((alertOptions) => {
        if (!alertOptions) {
          return;
        }

        const key = alertOptions.key ? alertOptions.key : this.alertKey;

        // multiple component instances, each only listens for it's own key
        if (key !== this.alertKey) {
          return;
        }

        // clear request
        if (alertOptions.clear) {
          this.messageService.clear(key);
          return;
        }

        // don't include global alerts
        if (!alertOptions.includeGlobalAlerts && GLOBAL_ALERTS.includes(alertOptions.summary)) {
          return;
        }

        // regular message
        this.messageService.add({
          key,
          severity: alertOptions.type || 'info',
          summary: alertOptions.summary,
          detail: alertOptions.detail,
          sticky: true,
        });
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
