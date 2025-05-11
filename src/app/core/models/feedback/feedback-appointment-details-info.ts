export interface FeedbackAppointmentDetailsInfo {
  fullAddress: string;
  listingId: number;
  listingAgent: string;
  office: string;
  agentEmail: string;
  thumbnailUrl: string;
  price?: number;
  date?: Date;
  startTime?: string;
  endTime?: string;
}
