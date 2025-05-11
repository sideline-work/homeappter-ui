import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe takes an errors object and a property key which belong to the former.
 * It will return an errors object with only the property key specified.
 */
@Pipe({
  name: 'formErrorsFilter',
})
export class FormErrorsFilterPipe implements PipeTransform {
  transform(
    errors: { [error: string]: any },
    filterError: string
  ): { [error: string]: any } | null {
    if (errors) {
      return Object.keys(errors)
        .filter((key) => key === filterError)
        .reduce((obj, key) => {
          obj[key] = errors[key];
          return obj;
        }, {});
    } else {
      return null;
    }
  }
}
