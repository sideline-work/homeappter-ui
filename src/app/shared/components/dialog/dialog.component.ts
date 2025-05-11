import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogCommand } from '@core/models/dialog';
import { DialogService } from '@core/services';
import { ConfirmationService, Confirmation } from 'primeng/api';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Input() key: string;

  header: string;
  showChangePermissionModal = false;
  styleClass: string;

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private router: Router
  ) {
    if (this.key == null) {
      this.key = this.router.url;
    }
  }

  ngOnInit(): void {
    this.dialogService.getDialogs$().subscribe((res: DialogCommand) => {
      if (res.styleClass) {
        this.styleClass = res.styleClass;
      }
      const params: Confirmation = {
        header: res.header,
        key: res.key,
        message: res.message,
        accept: res.onAccept,
        reject: res.onReject,
        acceptLabel: res.acceptLabel,
        rejectLabel: res.rejectLabel,
        acceptVisible: res.acceptVisible,
        rejectVisible: res.rejectVisible,
      };
      for (const key in params) {
        if (params.hasOwnProperty(key) && params[key] === undefined) {
          delete params[key];
        }
      }
      switch (res.type) {
        case 'info':
          if(res.disableIcon) {
            params.message =
            '<label class="mat-title p-text-center">' + params.message + '</label>';
          } else {
            params.message =
            '<i class="pi pi-info-circle"></i>' + '<span>' + params.message + '</span>';
          }
          break;
        case 'confirm':
          break;
        case 'question':
          params.message =
            '<i class="pi pi-question-circle"></i>' + '<span>' + params.message + '</span>';
          break;
        case 'error':
          params.message =
            '<i class="pi pi-times-circle"></i>' + '<span>' + params.message + '</span>';
          break;
        default:
          break;
      }
      this.confirmationService.confirm(params);
    });
  }

}
