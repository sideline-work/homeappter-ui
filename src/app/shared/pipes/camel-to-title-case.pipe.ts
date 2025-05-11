import { TitleCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelToTitleCase',
})
export class CamelToTitleCasePipe implements PipeTransform {
  constructor(private titleCasePipe: TitleCasePipe) {}

  transform(value: string): string {
    // split up camelCase
    if(value != null && value != "") {
      const words = value.match(/[A-Za-z][a-z]*/g).join(' ') || '';
      return this.titleCasePipe.transform(words);
    } else {
      return ""
    }

  }
}
