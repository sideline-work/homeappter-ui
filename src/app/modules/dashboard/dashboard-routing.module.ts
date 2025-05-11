import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentDetailsPageComponent } from '@shared/components';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SendEmailShowingInstructionsModalHostComponent } from './pages/send-email-showing-instructions-modal-host/send-email-showing-instructions-modal-host.component';
import { UpdateAppointmentStatusModalHostComponent } from './pages/update-appointment-status-modal-host/update-appointment-status-modal-host.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'details/:appointmentDetailsId',
        component: AppointmentDetailsPageComponent,
      },
      {
        path: 'update-status/:appointmentDetailsId',
        component: UpdateAppointmentStatusModalHostComponent,
      },
      {
        path: 'send-instructions',
        component: SendEmailShowingInstructionsModalHostComponent,
      },
    ]
    // children: [
    //   {
    //     path: 'details/:listingId',
    //     component: ListingDetailsModalHostComponent,
    //   },
    //   {
    //     path: 'schedule-appointment',
    //     component: ScheduleAppointmentModalHostComponent,
    //   },
    // ]
  },

  // {
  //   path: ':listingId',
  //   component: ListingDetailsModalHostComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
