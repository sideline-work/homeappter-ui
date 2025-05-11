import { Feedback, FeedbackAppointmentDetailsInfo } from ".";

export interface FeedbackAppointmentInfo {
  appointmentId: string;
  appointmentInfo: FeedbackAppointmentDetailsInfo;
  mlsNumber: string;
  feedback: Feedback [];
}
