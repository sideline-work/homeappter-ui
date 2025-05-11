import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { ACCESS_TYPES } from '@core/constants/listing';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-preference-access-form',
  templateUrl: './preference-access-form.component.html',
  styleUrls: ['./preference-access-form.component.scss']
})
export class PreferenceAccessFormComponent implements OnInit {

  @Input() formGroupValue: FormGroup;
  accessTypes: SelectItem []= [];

  // convenience getter for form controls
  get f(): { [key: string]: AbstractControl } {
    return this.formGroupValue.controls;
  }

  get fgErrors(): { [key: string]: ValidationErrors } {
    return this.formGroupValue.errors;
  }

  constructor() { }

  ngOnInit(): void {
    this.accessTypes = ACCESS_TYPES;
  }

}
