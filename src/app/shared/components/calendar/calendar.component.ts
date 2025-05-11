import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class CalendarComponent implements OnInit, OnChanges {
  /**
   * appendTo usage: put a templateRef (#ref) to the element where the calendar comp should be appended to, then:
   * <app-calendar [appendTo]="ref"></app-calendar>
   */
  @Input() appendTo: any;
  @Input() disabled: boolean;
  @Input() fixedTimeType: string;
  @Input() formControlNameValue: string;
  @Input() formGroup: FormGroup;
  @Input() icon;
  @Input() hourFormat;
  @Input() maxDate: Date;
  @Input() minDate: Date;
  @Input() placeholder: string;
  @Input() readonlyInput: boolean = true;
  @Input() showButtonBar: boolean;
  @Input() selectionMode = "single";
  @Input() timeOnly;
  @Input() styleClass: string | string[] | Set<string> | { [className: string]: any };
  @Input() yearRange: string;
  @Output() dateSelected: EventEmitter<any> = new EventEmitter();

  derivedYearRange: string;
  yearNavigator: boolean;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    const control = this.controlContainer.control.get(this.formControlNameValue);
    this.icon = "pi pi-calendar"
    // set hours on initialize value
    if (control.value) {
      this.setFixedTime(control.value);
    }

    if(this.timeOnly) {
      this.icon = "pi pi-clock";
    }

    // set hours on value changes
    control.valueChanges.subscribe((value) => {
      if (value) {
        this.setFixedTime(value);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // set year range if there are minDate or maxDate inputs
    if (changes.minDate && this.minDate && changes.maxDate && this.maxDate) {
      this.derivedYearRange = `${this.minDate.getFullYear()}:${this.maxDate.getFullYear()}`;
      this.yearNavigator = true;
    }
  }

  onCalendarClose(event) {
    const date: Date = new Date();
    const num: number = date.getTime() + event._data;
    const finalDate = new Date(num);
    if(this.timeOnly && this.formGroup.controls[this.formControlNameValue].value == null) {
      this.formGroup.controls[this.formControlNameValue].setValue(finalDate);
    }
  }

  private setFixedTime(value: Date): void {
    if (this.fixedTimeType && value) {
      switch (this.fixedTimeType) {
        case 'start':
          value.setHours(0, 0, 0, 0);
          break;
        case 'end':
          value.setHours(23, 59, 59, 999);
          break;
      }
    }
  }
}
