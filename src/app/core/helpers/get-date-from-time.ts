/**
 * @param date Date object to format
 * @returns date formatted as mm/dd/yyyy
 */
 export function getDateFromTime(time: string): any {
  const hourMin: string []  = time.split(":");
  return new Date(this.appointment.appointmentDate).setHours(parseInt(hourMin[0]), parseInt(hourMin[1]));
}
