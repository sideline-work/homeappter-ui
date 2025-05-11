import { PreferenceContacts } from ".";
import { PreferenceAccess } from "./preference-access";
import { PreferenceBlockDate } from "./preference-block-date";

export interface ShowingInstruction  {
  mlsNumber: string;
  showingDuration: number;
  accompaniedShowing: boolean;
  showingInstructions: string;
  accessList: PreferenceAccess [];
  contactList: PreferenceContacts [];
  blockDateList: PreferenceBlockDate [];
  approvalType?: string;
  homeStatus?: string;
  minsBeforeNotice?: string;
  workTime?: string;
  overlapping?: boolean;
  privateNotes?: string;
}
