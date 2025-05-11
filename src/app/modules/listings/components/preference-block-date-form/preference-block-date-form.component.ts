import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-preference-block-date-form',
  templateUrl: './preference-block-date-form.component.html',
  styleUrls: ['./preference-block-date-form.component.scss']
})
export class PreferenceBlockDateFormComponent implements OnInit {

  @Input() formGroupValue: FormGroup;
  today: Date;

  // convenience getter for form controls
  get f(): { [key: string]: AbstractControl } {
    return this.formGroupValue.controls;
  }

  get fgErrors(): { [key: string]: ValidationErrors } {
    return this.formGroupValue.errors;
  }

  constructor() { }

  ngOnInit(): void {
    this.today = new Date();
  }

}
