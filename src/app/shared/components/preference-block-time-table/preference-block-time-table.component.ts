import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { PreferenceBlockDate } from '@core/models/listing';
import { Column, Table } from '@core/models/table';

@Component({
  selector: 'app-preference-block-time-table',
  templateUrl: './preference-block-time-table.component.html',
  styleUrls: ['./preference-block-time-table.component.scss']
})
export class PreferenceBlockTimeTableComponent implements OnInit {

  @Input() preferenceBlockDate: PreferenceBlockDate[];
  @Input() isPrintView: boolean = false;
  columns: Column [] = [];
  table: Table<PreferenceBlockDate>;

  constructor() { }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.preferenceBlockDate && this.preferenceBlockDate) {
      this.table = {} as Table<PreferenceBlockDate>;
      this.setColumns();
      this.updateRow();
    }
  }

  private getDateFromTime(time: string): any {
    if(time != null) {
      const hourMin: string []  = time.split(":");
      return new Date(new Date()).setHours(parseInt(hourMin[0]), parseInt(hourMin[1]));
    }
  }

  private updateRow() {
    this.table.rows = this.preferenceBlockDate.map(p => ({
      ...p,
      startDateTime: this.getDateFromTime(p.startTime),
      endDateTime: this.getDateFromTime(p.endTime),
    }));
  }

  private setColumns() {
    this.columns = [
      {
        dataField: "startDate",
        dataType: "templateRef",
        headerText: "Date",
        colTemplateRefName: 'dateTemplate',
        style: "width: 38%",
      },
      {
        dataField: "startTime",
        dataType: "templateRef",
        headerText: "Time",
        colTemplateRefName: 'timeTemplate',
        style: "width: 32%"
      },
    ];
    this.table.columns = this.columns;
  }

}
