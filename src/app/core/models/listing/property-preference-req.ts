
export interface PropertyPreferenceReq  {
  preferenceId: number;
  mlsNumber: string;
  approvalType: string;
  homeStatus: string;
  minsBeforeNotice: string;
  workTime: string;
  showingDuration: string;
  overlapping: boolean;
  accompaniedShowing: boolean;
  privateNotes: string;
  showingInstructions: string;
  preferenceStatus: string;
}
