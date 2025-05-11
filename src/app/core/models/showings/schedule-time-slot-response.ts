import { TimeSlot } from ".";

export interface ScheduleTimeSlotResponse {
  takenTimeSlot: TimeSlot [];
  availableTimeSlot: TimeSlot [];
}
