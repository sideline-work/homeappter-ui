import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class PasswordFieldComponent implements OnInit {
  @Input() formControlNameValue: string;
  @Input() styleClass: string | string[] | Set<string> | { [className: string]: any };

  showPassword = false;

  constructor() {}

  ngOnInit(): void {}

  onClickShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
}
