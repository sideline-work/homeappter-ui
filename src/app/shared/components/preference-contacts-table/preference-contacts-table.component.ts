import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { PreferenceContacts } from '@core/models/listing';
import { Column, Table } from '@core/models/table';

@Component({
  selector: 'app-preference-contacts-table',
  templateUrl: './preference-contacts-table.component.html',
  styleUrls: ['./preference-contacts-table.component.scss']
})
export class PreferenceContactsTableComponent implements OnInit {

  @Input() preferenceContacts: PreferenceContacts[];
  columns: Column [] = [];
  table: Table<PreferenceContacts>;


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.preferenceContacts && this.preferenceContacts) {
      this.table = {} as Table<PreferenceContacts>;
      this.table.rows= this.preferenceContacts;
      this.setColumns();
    }
  }


  private setColumns() {
    this.columns = [
      {
        dataField: "name",
        dataType: "string",
        style: "width: 20%",
      },
      {
        dataField: "phone",
        dataType: "string",
        style: "width: 20%",
      },
      {
        dataField: "email",
        dataType: "string",
        style: "width: 60%",
      }
    ];
    this.table.columns = this.columns;
  }

}
