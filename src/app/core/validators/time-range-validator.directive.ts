import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * @returns errors when start date is greater than end date
 */
export function timeRangeValidator(
  startTimeControlName: string = 'startTime',
  endTimeControlName: string = 'endTime'
): ValidatorFn {
  return (group: FormGroup): ValidationErrors | null => {
    const startControl = group.get(startTimeControlName);
    const endControl = group.get(endTimeControlName);

    const startValue = new Date(startControl.value);
    const endValue = new Date(endControl.value);

    if (startValue > endValue) {
      return { startTimeGreaterThanEndTime: true };
    } else {
      return null;
    }
  };
}
