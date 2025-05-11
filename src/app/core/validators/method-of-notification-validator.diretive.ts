import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * @returns errors when start date is greater than end date
 */
export function methodOfnotificationValidator(
): ValidatorFn {
  return (group: FormGroup): ValidationErrors | null => {
    const notifViaEmail = group.get('notifViaEmail');
    const notifViaCall = group.get('notifViaCall');
    const notifViaSms = group.get('notifViaSms');

    if(notifViaEmail.value | notifViaCall.value | notifViaSms.value) {
      return null;
    } else {
      return { atLeastOneMethodOfNotification: true };
    }
  };
}
