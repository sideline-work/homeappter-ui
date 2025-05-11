import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { ListingDetailsModalComponent } from '../listing-details-modal/listing-details-modal.component';
import { PreviousRouteService } from '@core/services/previous-route.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-listing-details-modal-host',
  templateUrl: './listing-details-modal-host.component.html',
  styleUrls: ['./listing-details-modal-host.component.scss']
})
export class ListingDetailsModalHostComponent implements OnInit {

  currentDialog: MatDialogRef<ListingDetailsModalComponent> = null;
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

      this.currentDialog = dialog.open(ListingDetailsModalComponent, {
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
            this.router.navigate(['/home/listings']);
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
