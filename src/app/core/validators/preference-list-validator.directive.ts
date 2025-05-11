import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * @returns errors when start date is greater than end date
 */
export function preferenceListValidator(
): ValidatorFn {
  return (group: FormGroup): ValidationErrors | null => {
    const accessList = group.get('blockDateList');
    const blockDateList = group.get('blockDateList');
    const contactList = group.get('contactList');

    if(accessList.value.length == 0 || blockDateList.value.length == 0 || contactList.value.length == 0) {
      return { atleastOneItemPerPreferenceList: true };
    } else {
      return null;
    }
  };
}
