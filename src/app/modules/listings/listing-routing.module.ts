import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewListingModalHostComponent } from './components/add-new-listing-modal-host/add-new-listing-modal-host.component';
import { ListingDetailsModalHostComponent } from './components/listing-details-modal-host/listing-details-modal-host.component';
import { ListingDetailsModalComponent } from './components/listing-details-modal/listing-details-modal.component';
import { ScheduleAppointmentModalHostComponent } from './components/schedule-appointment-modal-host/schedule-appointment-modal-host.component';
import { ListingDetailsPageComponent } from './pages/listing-details-page/listing-details-page.component';
import { ListingInstructionComponent } from './pages/listing-instruction/listing-instruction.component';
import { ListingsComponent } from './pages/listings/listings.component';
import { NewListingComponent } from './pages/new-listing/new-listing.component';

const routes: Routes = [
  {
    path: '',
    component: ListingsComponent,
    children: [
      {
        path: 'details/:listingId',
        component: ListingDetailsPageComponent,
      },
      {
        path: 'schedule-appointment',
        component: ScheduleAppointmentModalHostComponent,
      },
      {
        path: 'add-new-listing',
        component: AddNewListingModalHostComponent,
      },

    ]
  },
  // {
  //   path: 'details/:listingId',
  //   component: ListingDetailsPageComponent,
  // },
  {
    path: 'new-listing',
    component: NewListingComponent,
  },
  {
    path: 'listing-instructions/:mlsNumber',
    component: ListingInstructionComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingsRoutingModule {}
