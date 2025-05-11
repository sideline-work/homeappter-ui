import { AppointmentCountDetails } from "./appointment-count-details";
import { Notification } from "./notification";

export interface DashboardDetailsResponse {
  showingRequest: number;
  appointmentRequest: number;
  newListing: number;
  notificationCount: number;
  appointmentUserRequested: AppointmentCountDetails;
  appointmentOtherRequested: AppointmentCountDetails;
  notifications: Notification [];
}
