import { PropertyPreferenceEntity } from ".";

export interface PreferenceBlockDate {
  blockId: number;
  mlsNumber: string;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  showingDuration: number;
  overlapping: boolean;
  startDateTime?: string; //ui specific
  endDateTime?: string;//ui specific
}
