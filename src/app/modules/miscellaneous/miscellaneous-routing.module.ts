import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackQuestionsPageComponent } from './pages/feedback-questions-page/feedback-questions-page.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: FeedbackPageComponent,
  //   children: [
  //     // {
  //     //   path: 'details/:listingId',
  //     //   component: ListingDetailsPageComponent,
  //     // },
  //     // {
  //     //   path: 'schedule-appointment',
  //     //   component: ScheduleAppointmentModalHostComponent,
  //     // },
  //     // {
  //     //   path: 'add-new-listing',
  //     //   component: AddNewListingModalHostComponent,
  //     // },

  //   ]
  // },
  {
    path: 'feedback-questions/:appointmentId/:mlsNumber/:token',
    component: FeedbackQuestionsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiscellaneousRoutingModule { }
