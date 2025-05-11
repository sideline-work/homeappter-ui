import { AppointmentStatistics } from ".";
import { Notification } from '@core/models/dashboard';

export interface UserAppointmentStatResponse {
  showingRequest: number;
  appointmentRequest: number;
  newListing: number;
  notificationCount: number;
  totalAgentListings: number;
  totalAgentDisabledListings: number;
  totalAgentDraftListings: number;
  totalAgentUpdatedListings: number;
  notifications: Notification[];
  appointmentUserRequested: AppointmentStatistics;
  appointmentOtherRequested: AppointmentStatistics;
}
