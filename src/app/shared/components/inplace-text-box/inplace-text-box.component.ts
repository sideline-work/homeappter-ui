import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-inplace-text-box',
  templateUrl: './inplace-text-box.component.html',
  styleUrls: ['./inplace-text-box.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class InplaceTextBoxComponent implements OnInit {

  @Input() closable: boolean = true;
  @Input() displayText: string;
  @Input() editable: boolean = true;
  @Input() formControlNameValue: string;

  constructor() { }

  ngOnInit(): void {
  }

}
