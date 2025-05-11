import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class DropdownComponent implements OnInit {
  @Input() appendTo: any;
  @Input() formControlNameValue: string;
  @Input() filter: boolean;
  @Input() options: SelectItem[];
  @Input() placeholder: string;
  @Input() styleClass: string | string[] | Set<string> | { [className: string]: any };
  @Input() disabled: boolean;

  constructor() {}

  ngOnInit(): void {}
}
