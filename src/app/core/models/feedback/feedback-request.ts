import { FeedbackAnswer } from ".";

export interface FeedbackRequest {
  appointmentId: string;
  mlsNumber: string;
  answer?: FeedbackAnswer [];
}
