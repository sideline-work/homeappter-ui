import { AppointmentStatus, RequestStatus } from ".";

export interface UpdateOnAppointmentRequest {
  appointmentId: number;
  requestStatus: RequestStatus;
  appointmentStatus: AppointmentStatus;
  remarks: string;
  sendEmail?: boolean;
}
