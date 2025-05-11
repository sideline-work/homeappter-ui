import { SelectItem } from "primeng/api";

export interface Column {
  dataField?: string; // custom columns may not have dataField
  dataType: string;
  textAlign?: string; // row custom alignment
  headerText?: string; // custom table header text
  colTemplateRefName?: string; // template reference name for custom rows
  colHeaderTemplateRefName?: string; // template reference name for custom columns
  durationFormat?: string; // selected format for duration field
  dateFormat?: string; // format for date field
  style?: string;
  columnFilter?: string;
  columnFilterOptions?: SelectItem[];
  columnFilterHeader?: string;
  columnFilterType?: string;
  wrap?: true;
}
