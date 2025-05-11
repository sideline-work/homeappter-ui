export interface Notification {
  notificationId: number;
  notificationMessage: number;
  from: number;
  action: string;
  date: Date;
  notifId?: number;
  notifTitle?: string;
  notifType?: string; //notifType: feedback_received, appointment_request, new_message
  refLink: string;
}
