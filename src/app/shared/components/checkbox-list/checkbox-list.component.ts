import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class CheckboxListComponent implements OnInit {

  @Input() options: { name: string, value: any} []= [];
  @Input() formControlNameValue: string;

  constructor() { }

  ngOnInit(): void {
  }

}
