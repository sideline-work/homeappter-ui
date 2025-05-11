import { AppointmentInfoResponse } from ".";

export interface AgentShowingReport {
  confirmShowing: AppointmentInfoResponse[];
  requestedShowing: AppointmentInfoResponse[];
  cancelShowing: AppointmentInfoResponse[];
}
