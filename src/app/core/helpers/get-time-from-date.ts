/**
 * @param date Date object to format
 * @returns date formatted as mm/dd/yyyy
 */
 export function getTimeFromDate(date: Date): string {
  const hour = new Date(date).getHours();
  const min = new Date(date).getMinutes();
  if(min < 10) {
     return `${hour}:0${min}:00`;
  } else {
    return `${hour}:${min}:00`;
  }
}
