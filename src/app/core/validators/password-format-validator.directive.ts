import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * @returns errors when the format of the password value is incorrect
 */
export function passwordFormatValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    const value = control.value;

    if (!control.value) {
      return null;
    }

    // regex to look ahead for lowercase chars, start of expression
    const oneLowerCase = '^(?=.*[a-z])';
    // regex to look ahead for uppercase chars
    const oneUpperCase = '(?=.*[A-Z])';
    // regex to look ahead for a number or special chars
    const oneNumberOrSpecialChar = '((?=.*\\d)|(?=.*[!@#$%^&*()_+=\\\'"`<>?|~[\\]{},.;\\\\/:-]))';
    // regex that tells which characters are allowed (alphabets, numbers, special chars), end of expression
    const allowedChars = '[A-Za-z\\d!@#$%^&*()_+=\\\'"`<>?|~[\\]{},.;\\\\/:-]*$';
    const passwordMask = oneLowerCase + oneUpperCase + oneNumberOrSpecialChar + allowedChars;
    const passwordRegex = new RegExp(passwordMask, 'g');

    if (passwordRegex.test(value) === false) {
      return { incorrectPasswordFormat: true };
    } else {
      return null;
    }
  };
}
