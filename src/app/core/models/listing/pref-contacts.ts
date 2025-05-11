
export interface PrefContacts  {
  contactPrefId: number;
	mlsNumber: string;
	contactType: string;
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
