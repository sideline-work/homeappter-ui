import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { unflattenData } from '@core/helpers';
import { AppointmentResponse } from '@core/models/showings';
import { PreviousRouteService } from '@core/services';
import { SendEmailShowingInstructionsModalComponent } from '@modules/dashboard/components/send-email-showing-instructions-modal/send-email-showing-instructions-modal.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-send-email-showing-instructions-modal-host',
  templateUrl: './send-email-showing-instructions-modal-host.component.html',
  styleUrls: ['./send-email-showing-instructions-modal-host.component.scss']
})
export class SendEmailShowingInstructionsModalHostComponent implements OnInit {

  currentDialog: MatDialogRef<SendEmailShowingInstructionsModalComponent> = null;
  destroy = new Subject<any>();
  previousUrl: string;
  appointment: AppointmentResponse;

  constructor(
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private previousRouteService: PreviousRouteService,
  ) {

    route.params.pipe(takeUntil(this.destroy))
    .subscribe(params => {
      this.previousUrl = this.previousRouteService.getPreviousUrl();

      if(this.currentDialog) {
        this.currentDialog.close();
        return;
      }

      if (Object.keys(params).length !== 0) {
        this.appointment = unflattenData(params);
      }

      this.currentDialog = dialog.open(SendEmailShowingInstructionsModalComponent, {
         data: {
          appointment: this.appointment
        },
      });
      this.currentDialog.afterClosed().subscribe(result => {
        this.currentDialog = null;
        this.location.back();
      })
    })
  }


  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroy.next();
  }

}
