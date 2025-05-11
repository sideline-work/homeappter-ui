import { Input } from '@angular/core';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { PreferenceAccess, PreferenceBlockDate } from '@core/models/listing';
import { Column, Table } from '@core/models/table';

@Component({
  selector: 'app-preference-access-table',
  templateUrl: './preference-access-table.component.html',
  styleUrls: ['./preference-access-table.component.scss']
})
export class PreferenceAccessTableComponent implements OnInit {

  @Input() isPrintView: boolean = false;
  @Input() preferenceAccess: PreferenceAccess[];
  columns: Column [] = [];
  table: Table<PreferenceAccess>;


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.preferenceAccess && this.preferenceAccess) {
      this.table = {} as Table<PreferenceAccess>;
      this.table.rows= this.preferenceAccess;
      this.setColumns();
    }
  }


  private setColumns() {
    this.columns = [
      {
        dataField: "accessType",
        style: "width: 25%",
        dataType: "string",
        colTemplateRefName: 'accessTypeTemplate'
      },
      {
        dataField: "accessCode",
        dataType: "string",
        style: "width: 20%",
      },
      {
        dataField: "remarks",
        dataType: "string",
        style: "width: 35%",
      },
      {
        dataField: "location",
        dataType: "string",
        style: "width: 20%",
      }
    ];
    this.table.columns = this.columns;
  }

}
