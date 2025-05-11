import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { CONTACT_TYPES } from '@core/constants/listing';
import { SelectItem } from 'primeng/api/public_api';

@Component({
  selector: 'app-preference-contact-form',
  templateUrl: './preference-contact-form.component.html',
  styleUrls: ['./preference-contact-form.component.scss']
})
export class PreferenceContactFormComponent implements OnInit {

  @Input() formGroupValue: FormGroup;

  contactTypes: SelectItem [] = [];

  // convenience getter for form controls
  get f(): { [key: string]: AbstractControl } {
    return this.formGroupValue.controls;
  }

  get fgErrors(): { [key: string]: ValidationErrors } {
    return this.formGroupValue.errors;
  }

  constructor() { }

  ngOnInit(): void {
    this.contactTypes = CONTACT_TYPES;
  }

}
