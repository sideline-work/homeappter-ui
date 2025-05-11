/**
 * @param date Date object to format
 * @returns date formatted as mm/dd/yyyy
 */
export function dateToString(date: Date): string {
    var month = date.getMonth() + 1;
    var day = date .getDate();
    var year = date .getFullYear();
    return year + "-" + month + "-" + day;
}
