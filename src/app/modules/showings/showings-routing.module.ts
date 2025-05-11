import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentDetailsPageComponent } from '@shared/components';
import { CalendarShowingsComponent } from './pages/calendar-showings/calendar-showings.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarShowingsComponent,
    children: [
      {
        path: 'details/:appointmentDetailsId',
        component: AppointmentDetailsPageComponent,
      },
    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowingsRoutingModule {}
