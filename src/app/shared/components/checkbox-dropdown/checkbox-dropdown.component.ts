import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-checkbox-dropdown',
  templateUrl: './checkbox-dropdown.component.html',
  styleUrls: ['./checkbox-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: CheckboxDropdownComponent
    }
  ]
})
export class CheckboxDropdownComponent implements ControlValueAccessor {

  @Input() appendTo: any;
  @Input() filter: boolean;
  @Input() options: SelectItem[];
  @Input() placeholder: string;
  @Input() styleClass: string | string[] | Set<string> | { [className: string]: any };
  enabled: boolean = true;
  selectedValue: any;
  onChange: (selectedValue) => {};
  touched: () => void;

  constructor() { }

  writeValue(selectedValue: any): void {
    this.selectedValue = selectedValue;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.enabled = !isDisabled;
    this.onChangeEnabled();
  }

  onChangeEvent(event) {
    this.onChange(this.selectedValue);
  }

  onChangeEnabled() {
    if(this.enabled) {
      this.onChange(this.selectedValue);
    } else {
      this.onChange(null);
    }
  }

}
