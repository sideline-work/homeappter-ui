import { AppointmentStatus } from "@core/models/showings";

export const APPOINTMENT_STATUSES = [
  { label: 'Requested', value: AppointmentStatus.REQUESTED },
  { label: 'Confirmed', value: AppointmentStatus.CONFIRMED },
  { label: 'Cancelled', value: AppointmentStatus.CANCELLED },
];
