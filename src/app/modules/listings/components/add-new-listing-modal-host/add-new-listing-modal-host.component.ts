import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { unflattenData } from '@core/helpers';
import { Property } from '@core/models/listing';
import { PreviousRouteService } from '@core/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddNewListingModalComponent } from '../add-new-listing-modal/add-new-listing-modal.component';

@Component({
  selector: 'app-add-new-listing-modal-host',
  templateUrl: './add-new-listing-modal-host.component.html',
  styleUrls: ['./add-new-listing-modal-host.component.scss']
})
export class AddNewListingModalHostComponent implements OnInit {

  currentDialog: MatDialogRef<AddNewListingModalComponent> = null;
  destroy = new Subject<any>();
  previousUrl: string;
  listing: Property;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private previousRouteService: PreviousRouteService,
  ) {
    this.previousUrl = this.previousRouteService.getPreviousUrl();

    route.params.pipe(takeUntil(this.destroy))
    .subscribe(params => {
      if(this.currentDialog) {
        this.currentDialog.close();
        return;
      }

      if (Object.keys(params).length !== 0) {
        this.listing = unflattenData(params);
      }

      this.currentDialog = dialog.open(AddNewListingModalComponent, {
         data: {
          listing: this.listing
        },
      });
      this.currentDialog.afterClosed().subscribe(result => {
        this.router.navigate(['/home/listings']);
      })
    })
  }


  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroy.next();
  }

}
