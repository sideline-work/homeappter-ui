import { Pipe, PipeTransform } from '@angular/core';
import { Column } from '@core/models/table';
import { CamelToTitleCasePipe } from './camel-to-title-case.pipe';

@Pipe({
  name: 'tableHeader',
})
export class TableHeaderPipe implements PipeTransform {
  constructor(private camelToTitleCasePipe: CamelToTitleCasePipe) {}

  transform(col: Column): string {
    if (col.headerText) {
      return col.headerText;
    } else if (col.dataField) {
      const headerText = this.camelToTitleCasePipe.transform(col.dataField);
      const headerTextAr = headerText.split(' ');
      return headerTextAr.map(this.customFormat).join(' ');
    } else {
      return '';
    }
  }

  private customFormat(word: string): string {
    switch (word) {
      case 'Id':
        return 'ID';
      default:
        return word;
    }
  }
}
