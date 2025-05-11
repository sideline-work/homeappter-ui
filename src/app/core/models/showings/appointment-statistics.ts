import { Statistics } from ".";

export interface AppointmentStatistics {
  today: Statistics;
  tomorrow: Statistics;
  week: Statistics;
  month: Statistics;
}
