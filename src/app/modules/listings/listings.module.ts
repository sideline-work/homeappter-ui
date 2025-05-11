import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ListingsComponent } from './pages/listings/listings.component';
import { ListingsRoutingModule } from './listing-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ListingDataFormComponent } from './components/listing-data-form/listing-data-form.component';
import { ListingDetailsModalHostComponent } from './components/listing-details-modal-host/listing-details-modal-host.component';
import { ListingDetailsModalComponent } from './components/listing-details-modal/listing-details-modal.component';
import { ListingItemGridViewComponent } from './components/listing-item-grid-view/listing-item-grid-view.component';
import { ListingItemListViewComponent } from './components/listing-item-list-view/listing-item-list-view.component';
import { ListingListComponent } from './components/listing-list/listing-list.component';
import { MyListingsComponent } from './components/my-listings/my-listings.component';
import { ScheduleAppointmentModalHostComponent } from './components/schedule-appointment-modal-host/schedule-appointment-modal-host.component';
import { ScheduleAppointmentModalComponent } from './components/schedule-appointment-modal/schedule-appointment-modal.component';
import { SearchListingsFilterComponent } from './components/search-listings-filter/search-listings-filter.component';
import { SearchListingsComponent } from './components/search-listings/search-listings.component';
import { SideBarLisingButtonsComponent } from './components/side-bar-lising-buttons/side-bar-lising-buttons.component';
import { ScheduleAppointmentFormComponent } from './components/schedule-appointment-form/schedule-appointment-form.component';
import { NewListingComponent } from './pages/new-listing/new-listing.component';
import { ListingInstructionComponent } from './pages/listing-instruction/listing-instruction.component';
import { ShowingInstructionsComponent } from './components/showing-instructions/showing-instructions.component';
import { PreferenceContactFormComponent } from './components/preference-contact-form/preference-contact-form.component';
import { PreferenceAccessFormComponent } from './components/preference-access-form/preference-access-form.component';
import { PreferenceBlockDateFormComponent } from './components/preference-block-date-form/preference-block-date-form.component';
import { PreferenceContactModalComponent } from './components/preference-contact-modal/preference-contact-modal.component';
import { PreferenceBlockDateModalComponent } from './components/preference-block-date-modal/preference-block-date-modal.component';
import { PreferenceAccessModalComponent } from './components/preference-access-modal/preference-access-modal.component';
import { PreferenceContactDetailsCardComponent } from './components/preference-contact-details-card/preference-contact-details-card.component';
import { PreferenceBlockDateDetailsCardComponent } from './components/preference-block-date-details-card/preference-block-date-details-card.component';
import { PreferenceAccessCardComponent } from './components/preference-access-card/preference-access-card.component';
import { BlockTimeTableComponent } from './components/block-time-table/block-time-table.component';
import { ListingDetailsPageComponent } from './pages/listing-details-page/listing-details-page.component';
import { AddNewListingFormComponent } from './components/add-new-listing-form/add-new-listing-form.component';
import { AddNewListingModalComponent } from './components/add-new-listing-modal/add-new-listing-modal.component';
import { AddNewListingModalHostComponent } from './components/add-new-listing-modal-host/add-new-listing-modal-host.component';
import { ListingOverviewComponent } from './components/listing-overview/listing-overview.component';

@NgModule({
  declarations: [
    ListingsComponent,
    MyListingsComponent,
    SearchListingsComponent,
    SearchListingsFilterComponent,
    ListingListComponent,
    SideBarLisingButtonsComponent,
    ListingDataFormComponent,
    ScheduleAppointmentModalHostComponent,
    ScheduleAppointmentModalComponent,
    ListingDetailsModalHostComponent,
    ListingDetailsModalComponent,
    ListingItemGridViewComponent,
    ListingItemListViewComponent,
    ScheduleAppointmentFormComponent,
    NewListingComponent,
    ListingInstructionComponent,
    ShowingInstructionsComponent,
    PreferenceContactFormComponent,
    PreferenceAccessFormComponent,
    PreferenceBlockDateFormComponent,
    PreferenceContactModalComponent,
    PreferenceBlockDateModalComponent,
    PreferenceAccessModalComponent,
    PreferenceContactDetailsCardComponent,
    PreferenceBlockDateDetailsCardComponent,
    PreferenceAccessCardComponent,
    BlockTimeTableComponent,
    ListingDetailsPageComponent,
    AddNewListingFormComponent,
    AddNewListingModalComponent,
    AddNewListingModalHostComponent,
    ListingOverviewComponent,
  ],
  imports: [
    SharedModule,
    ListingsRoutingModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  // entryComponents: [
  //   PreferenceContactModalComponent
  // ]
})
export class ListingsModule { }
