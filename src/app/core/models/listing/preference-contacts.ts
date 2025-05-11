import { PropertyPreferenceEntity } from ".";

export interface PreferenceContacts {
  contactPrefId: number;
  mlsNumber: string;
  contactType: string;
  name: string;
  phone: string;
  email: string;
  notifViaEmail: boolean;
  notifViaCall: boolean;
  notifViaSms: boolean;
  receivedNotifShowingApproval: boolean;
  receivedNotifAppointmentStatus: boolean;
  receivedNotifShowingFeedback: boolean;
  priority: boolean;
}
