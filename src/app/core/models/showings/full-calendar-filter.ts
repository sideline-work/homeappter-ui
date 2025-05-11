import { CalendarMode } from ".";
import { AppointmentStatus } from "./appointment-status";
import { DateRange } from "./date-range";

export interface FullCalendarFilter {
  calendarMode: CalendarMode;
  selectedDateRange: DateRange;
  onMyListings: string;
  iHaveRequested:  string;
  statuses: AppointmentStatus [];
}
