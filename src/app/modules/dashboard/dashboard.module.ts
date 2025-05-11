import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CountOverviewComponent } from './components/count-overview/count-overview.component';
import { CountOverviewWidgetComponent } from './components/count-overview-widget/count-overview-widget.component';
import { NotificationsCardComponent } from './components/notifications-card/notifications-card.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { NotificationItemComponent } from './components/notification-item/notification-item.component';
import { AppointmentUserRequestedTableComponent } from './components/appointment-user-requested-table/appointment-user-requested-table.component';
import { AppointmentOtherRequestedTableComponent } from './components/appointment-other-requested-table/appointment-other-requested-table.component';
import { AppointmentRequestedTableComponent } from './components/appointment-requested-table/appointment-requested-table.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { UpdateAppointmentStatusModalHostComponent } from './pages/update-appointment-status-modal-host/update-appointment-status-modal-host.component';
import { UpdateAppointmentStatusModalComponent } from './components/update-appointment-status-modal/update-appointment-status-modal.component';
import { UpdateAppointmentStatusFormComponent } from './components/update-appointment-status-form/update-appointment-status-form.component';
import { SendEmailShowingInstructionsModalComponent } from './components/send-email-showing-instructions-modal/send-email-showing-instructions-modal.component';
import { SendEmailShowingInstructionsModalHostComponent } from './pages/send-email-showing-instructions-modal-host/send-email-showing-instructions-modal-host.component';
import { SendEmailShowingInstructionsFormComponent } from './components/send-email-showing-instructions-form/send-email-showing-instructions-form.component';


@NgModule({
  declarations: [DashboardComponent, CountOverviewComponent, CountOverviewWidgetComponent, NotificationsCardComponent, NotificationListComponent, NotificationItemComponent, AppointmentUserRequestedTableComponent, AppointmentOtherRequestedTableComponent, AppointmentRequestedTableComponent, DashboardAdminComponent, DashboardUserComponent, UpdateAppointmentStatusModalHostComponent, UpdateAppointmentStatusModalComponent, UpdateAppointmentStatusFormComponent, SendEmailShowingInstructionsModalComponent, SendEmailShowingInstructionsModalHostComponent, SendEmailShowingInstructionsFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
