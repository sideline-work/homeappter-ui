import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';

const routes: Routes = [
  {
    path: '',
    component: MessagesPageComponent,
    // children: [
    //   // {
    //   //   path: 'details/:appointmentDetailsId',
    //   //   component: AppointmentDetailsPageComponent,
    //   // },
    // ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesRoutingModule {}
