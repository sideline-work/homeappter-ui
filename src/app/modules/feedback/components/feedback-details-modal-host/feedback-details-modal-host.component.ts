import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PreviousRouteService } from '@core/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FeedbackDetailsModalComponent } from '../feedback-details-modal/feedback-details-modal.component';

@Component({
  selector: 'app-feedback-details-modal-host',
  templateUrl: './feedback-details-modal-host.component.html',
  styleUrls: ['./feedback-details-modal-host.component.scss']
})
export class FeedbackDetailsModalHostComponent implements OnInit {

  currentDialog: MatDialogRef<FeedbackDetailsModalComponent> = null;
  destroy = new Subject<any>();
  previousUrl: string;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private previousRouteService: PreviousRouteService,
  ) {
    this.previousUrl = this.previousRouteService.getPreviousUrl();

    route.params.pipe(takeUntil(this.destroy))
    .subscribe(params => {
      if(this.currentDialog != null) {
        this.currentDialog.close({event: this.router.url});
        return;
      }

      this.currentDialog = dialog.open(FeedbackDetailsModalComponent, {
         data: {
          listingId: params.listingId
        },
        // minWidth: '65vw',
      });
      this.currentDialog.afterClosed().subscribe(result => {
        if(!result || result == '') {
          if(this.previousUrl != null) {
            this.router.navigate([this.previousUrl]);
          } else {
            this.router.navigate(['/home/feedback']);
          }
        }
      })
    })
  }


  ngOnInit(): void {
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    this.destroy.next();
  }

}
