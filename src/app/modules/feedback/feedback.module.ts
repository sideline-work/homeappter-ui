import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackPageComponent } from './pages/feedback-page/feedback-page.component';
import { MyFeedbackComponent } from './pages/my-feedback/my-feedback.component';
import { FeedbackSettingsComponent } from './pages/feedback-settings/feedback-settings.component';
import { SharedModule } from '@shared/shared.module';
import { FeedbackOnMyListingComponent } from './components/feedback-on-my-listing/feedback-on-my-listing.component';
import { FeedbackListingsIHaveShownComponent } from './components/feedback-listings-ihave-shown/feedback-listings-ihave-shown.component';
import { FeedbackListingsTableComponent } from './components/feedback-listings-table/feedback-listings-table.component';
import { FeedbackDetailsModalComponent } from './components/feedback-details-modal/feedback-details-modal.component';
import { FeedbackDetailsModalHostComponent } from './components/feedback-details-modal-host/feedback-details-modal-host.component';
import { FeedbackListingSummaryComponent } from './components/feedback-listing-summary/feedback-listing-summary.component';


@NgModule({
  declarations: [FeedbackPageComponent, MyFeedbackComponent, FeedbackSettingsComponent, FeedbackOnMyListingComponent, FeedbackListingsIHaveShownComponent, FeedbackListingsTableComponent, FeedbackDetailsModalComponent, FeedbackDetailsModalHostComponent, FeedbackListingSummaryComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    SharedModule
  ]
})
export class FeedbackModule { }
