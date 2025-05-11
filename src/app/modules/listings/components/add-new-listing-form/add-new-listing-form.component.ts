import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PROPERTY_STATUSES, PROPERTY_TYPES } from '@core/constants/listing';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-add-new-listing-form',
  templateUrl: './add-new-listing-form.component.html',
  styleUrls: ['./add-new-listing-form.component.scss']
})
export class AddNewListingFormComponent implements OnInit {

  @Input() formGroupValue: FormGroup;

  propertyTypes: SelectItem [] = [];
  propertyStatuses: SelectItem [] = [];

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.propertyStatuses = PROPERTY_STATUSES;
    this.propertyTypes = PROPERTY_TYPES;
  }



}
