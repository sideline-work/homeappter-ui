import { AppointmentInfoResponse, AppointmentStatus, RequestStatus } from ".";

export interface AppointmentResponse {
  appointmentId: number;
  ticketId: string;
  refId: string,
  listingId: string,
  mlsNumber: string,
  date: Date,
  startTime: string,
  endTime: string,
  hostMemberMlsId: string,
  message: string,
  appointmentStatus: AppointmentStatus,
  requestStatus: RequestStatus,
  requestType: string,
  requestByUid: number,
  requestByMlsId: string,
  requestedDate: Date,
  appointmentInfo: AppointmentInfoResponse,
  appointmentDate?: Date
}
