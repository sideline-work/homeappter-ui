import { Output, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { Table } from '@core/models/table';
import { SortEvent } from 'primeng/api';
import { Table as DataTable } from 'primeng/table';
//import { Table  as DataTable} from 'primeng/table/public_api';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges, AfterContentInit {
  @Input() caption: string;
  @Input() customSort: boolean;
  @Input() customSortFields: string []= [];
  @Input() dense: boolean = false;
  @Input() denseCell: boolean = false;
  @Input() globalFilterFields: string [];
  @Input() paginator: boolean = false;
  @Input() rows: number;
  @Input() selectedRow: any;
  @Input() selectionMode: string;
  @Input() sortMode: string = 'single';
  @Input() table: Table<any>;
  @Input() tableHeight: string;
  @ContentChildren(TemplateRef) tempList: QueryList<TemplateRef<any>>;
  @Output() onRowSelect = new EventEmitter<any>();
  @Output() sortFunction = new EventEmitter<{
    event: SortEvent,
    firstData: any,
    secondData: any,
    firstValue: any,
    secondValue: any,
    func: any
  }>();

  @ViewChild('reportTable', { static: false }) reportTable: DataTable;

  customSortMap: Map<string, string> = new Map<string, string>();
  hasColumnTemplateHeader: boolean;
  pageSize = 50;
  templateList: TemplateRef<any>[];

  onCustomSort(event: SortEvent) {
    if(!this.customSortMap.get(event.field)) {
      event.data.sort((data1, data2) => {
        const fields1: string [] = event.field.split(".");

        let value1 = fields1.length > 1 ?  data1[fields1[0]][fields1[1]] : data1[fields1[0]];
        let value2 = fields1.length > 1 ? data2[fields1[0]][fields1[1]] : data2[fields1[0]] ;
        let result = null;

        if (value1 == null && value2 != null)
          result = -1;
        else if (value1 != null && value2 == null)
          result = 1;
        else if (value1 == null && value2 == null)
          result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
          result = value1.localeCompare(value2);
        else
          result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

        return (event.order * result);
      });
    } else {
      event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null)
          result = -1;
        else if (value1 != null && value2 == null)
          result = 1;
        else if (value1 == null && value2 == null)
          result = 0;
        else
          this.sortFunction.emit({
            event: event,
            firstData: data1,
            secondData: data2,
            firstValue: value1,
            secondValue: value2,
            func: (data) => {
              result = data
            }
          });
        return (event.order * result);
      });
    }
  }

  onChange(event) {
    this.reportTable.filter(event[0].value, 'requestStatus', 'in');
  }

  valChange(event) {
  }

  get pageReportTemplate(): string {
    if (this.table) {
      if (this.table.rows && this.table.rows.length > 0) {
        return 'Showing {first} to {last} of {totalRecords} entries';
      }
    }
    return 'Showing 0 to {last} of {totalRecords} entries';
  }

  constructor() {

  }

  ngOnInit(): void {
    if (this.table) {
      if (!this.table.rows || this.table.rows.length === 0) {
        this.tableHeight = undefined;
      }
    }
    this.customSortFields.forEach(col => {
      this.customSortMap.set(col, col);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.table && this.table) {
      this.hasColumnTemplateHeader = this.table.columns.some(
        (col) => col.colHeaderTemplateRefName != null
      );
    }
  }

  ngAfterContentInit(): void {
    this.templateList = this.tempList.toArray();
  }

  getTemplate(colTemplateRefName: string): TemplateRef<any> {
    return this.templateList.find(
      (t) => (t as any)._declarationTContainer.localNames[0] === colTemplateRefName
    );
  }

  onRowSelected(e) {
    this.onRowSelect.emit(e);
  }

  // Workaround fix for sort triggering when clicking a custom column template
  stopSortPropagation(e): void {
    e.preventDefault();
    e.stopPropagation();
  }
}
