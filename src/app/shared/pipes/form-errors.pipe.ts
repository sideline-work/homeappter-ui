import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formErrors'
})
export class FormErrorsPipe implements PipeTransform {

  transform(errors: { [error: string]: any }, fieldName: string | string[]): string {
    if (errors) {
      const errorMessage = this.getError(errors, fieldName);
      return errorMessage;
    } else {
      return null;
    }
  }

  private getError(errors: { [error: string]: any }, fieldName: string | string[]): string {
    let errorMessage = '';

    if (typeof fieldName === 'string') {
      fieldName = [fieldName];
    }

    if (errors.required || errors.whitespace) {
      errorMessage = `${fieldName[0]} field is required.`;
    } else if (errors.email) {
      errorMessage = 'Incorrect email format.';
    } else if (errors.startTimeGreaterThanEndTime) {
      errorMessage = `${fieldName[0]} must be before ${fieldName[1]}.`;
    } else if (errors.atLeastOneMethodOfNotification) {
      errorMessage = 'Select at least one notification method';
    } else if (errors.atLeastOneNotificationType) {
      errorMessage = 'Select at least one notification type';
    } else if (errors.incorrectPasswordFormat) {
      errorMessage =
        'Password must contain at least one lowercase, one uppercase, one number or one special character. Must not have whitespace.';
    } else {
      errorMessage = 'Unhandled Error.';
    }

    return errorMessage;
  }

}
