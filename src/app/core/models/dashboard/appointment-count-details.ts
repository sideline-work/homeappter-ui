import { AppointmentCount } from "./appointment-count";

export interface AppointmentCountDetails {
  today: AppointmentCount;
  tomorrow: AppointmentCount;
  week: AppointmentCount;
  month: AppointmentCount;
}
