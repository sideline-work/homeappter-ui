import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackDetailsModalHostComponent } from './components/feedback-details-modal-host/feedback-details-modal-host.component';
import { FeedbackPageComponent } from './pages/feedback-page/feedback-page.component';
import { FeedbackSettingsComponent } from './pages/feedback-settings/feedback-settings.component';
import { MyFeedbackComponent } from './pages/my-feedback/my-feedback.component';

const routes: Routes = [
  {
    path: '',
    component: MyFeedbackComponent,
    children: [
      // {
      //   path: 'details/:listingId',
      //   component: ListingDetailsPageComponent,
      // },
      {
        path: 'feedback-details',
        component: FeedbackDetailsModalHostComponent,
      }
    ]
  },
  {
    path: 'feedback-settings',
    component: FeedbackSettingsComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
