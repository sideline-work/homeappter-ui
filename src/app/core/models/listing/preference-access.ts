import { PropertyPreferenceEntity } from ".";

export interface PreferenceAccess {
  accessId: number;
  mlsNumber: string;
  accessType: string;
  accessCode: string;
  remarks: string;
  location: string;
  propertyPref: PropertyPreferenceEntity;
}
