import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * @returns errors when start date is greater than end date
 */
export function notificationTypeValidator(
): ValidatorFn {
  return (group: FormGroup): ValidationErrors | null => {
    const receivedNotifShowingApproval = group.get('receivedNotifShowingApproval');
    const receivedNotifAppointmentStatus = group.get('receivedNotifAppointmentStatus');
    const receivedNotifShowingFeedback = group.get('receivedNotifShowingFeedback');

    if(receivedNotifShowingApproval.value | receivedNotifAppointmentStatus.value | receivedNotifShowingFeedback.value) {
      return null;
    } else {
      return { atLeastOneNotificationType: true };
    }
  };
}
