import { PreferenceAccess, PreferenceBlockDate, PreferenceContacts } from ".";

export interface PropertyPreferenceEntity  {
  preferenceId: number;
	mlsNumber: string;
	approvalType: string;
	homeStatus: string;
	minsBeforeNotice: string;
	workTime: string
  showingDuration: string
	overlapping: boolean;
	accompaniedShowing: boolean;
	privateNotes: string;
	showingInstructions: string;
	showingStatus: string;
	dateAdded: Date;
	lastUpdate: Date;
  accessList: PreferenceAccess [];
  contactList: PreferenceContacts [];
  blockDateList: PreferenceBlockDate [];
}
