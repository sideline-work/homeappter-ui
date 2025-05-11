import { SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PreferenceBlockDate } from '@core/models/listing';
import { Column, Table } from '@core/models/table';

@Component({
  selector: 'app-block-time-table',
  templateUrl: './block-time-table.component.html',
  styleUrls: ['./block-time-table.component.scss']
})
export class BlockTimeTableComponent implements OnInit, OnChanges {

  @Output() onDeleteBlockDate = new EventEmitter<any>();
  @Output() onEditBlockDate = new EventEmitter<any>();
  @Input() preferenceBlockDates: PreferenceBlockDate[];
  columns: Column [] = [];
  table: Table<PreferenceBlockDate>;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.preferenceBlockDates && this.preferenceBlockDates) {
      this.table = {} as Table<PreferenceBlockDate>;
      this.setColumns();
      this.updateRow();
    }
  }

  private updateRow() {
    this.table.rows = this.preferenceBlockDates.map(p => ({
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
      {
        dataField: "edit/delete",
        dataType: "templateRef",
        headerText: " ",
        colTemplateRefName: 'editDeleteTemplate',
        textAlign: "center",
        style: "width: 25%"
      },
    ];
    this.table.columns = this.columns;
  }

  onDelete(row) {
    this.onDeleteBlockDate.emit(row);
  }

  onEdit(row) {
    this.onEditBlockDate.emit(row);
  }

  getDateFromTime(time: string): any {
    if(time != null) {
      const hourMin: string []  = time.split(":");
      return new Date(new Date()).setHours(parseInt(hourMin[0]), parseInt(hourMin[1]));
    }
  }


}
