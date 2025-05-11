import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { unflattenData } from '@core/helpers';
import { AppointmentResponse } from '@core/models/showings';
import { PreviousRouteService } from '@core/services';
import { UpdateAppointmentStatusModalComponent } from '@modules/dashboard/components/update-appointment-status-modal/update-appointment-status-modal.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-appointment-status-modal-host',
  templateUrl: './update-appointment-status-modal-host.component.html',
  styleUrls: ['./update-appointment-status-modal-host.component.scss']
})
export class UpdateAppointmentStatusModalHostComponent implements OnInit {

  currentDialog: MatDialogRef<UpdateAppointmentStatusModalComponent> = null;
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

      this.currentDialog = dialog.open(UpdateAppointmentStatusModalComponent, {
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
