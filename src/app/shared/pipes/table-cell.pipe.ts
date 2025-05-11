import { CurrencyPipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { ACCESS_TYPES } from '@core/constants/listing';
import { APPOINTMENT_STATUSES, REQUEST_STATUSES } from '@core/constants/status';
import { UserAccountResponse } from '@core/models/member';
import { Column } from '@core/models/table';

@Pipe({
  name: 'tableCell',
  pure: false,
})
export class TableCellPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe, private currencyPipe: CurrencyPipe ) {}

  transform(row: any, col?: Column, field?: string): string {
    const switchField = field != null ? field : col.dataType;
    switch (switchField) {
      case 'duration':
        const val = Number(this.decimalPipe.transform(row.duration / 3600000, '1.0-2'));
        return val.toString();
      case 'mls':
        const mslVal = row[col.dataField].name;
        return mslVal.toString();
      case 'appointmentStatus':
        const dataFieldAppointmentStatus = field != null ? field : col.dataField;
        const appointmentStatus = APPOINTMENT_STATUSES.find( stat => stat.value == row );
        return appointmentStatus.label;
      case 'requestStatus':
        const dataFieldTicket = field != null ? field : col.dataField;
        const requestStatus = REQUEST_STATUSES.find( stat => stat.value == row );
        return requestStatus.label;
      case 'agents':
        const agents = row[col.dataField] as UserAccountResponse[];
        return agents.map(e => e.fullname).join(",");
      case 'currencyUsd':
          const currencyUsd = row[col.dataField] !=null ? this.currencyPipe.transform(row[col.dataField]) : null;
          return currencyUsd;
      case 'nestedObject':
        const strA: string [] = col.dataField.split(".");
        return row[strA[0]][strA[1]];
      case 'accessType':
        const accessType = ACCESS_TYPES.find( stat => stat.value == row );
        return accessType != null ? accessType.label : row;
      default:
        return row[col.dataField];
    }
  }
}
