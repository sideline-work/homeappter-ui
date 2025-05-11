import { EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCalendar, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { dateToString } from '@core/helpers';
import { DateRange } from '@core/models/showings';
import { CalendarMode } from '@core/models/showings/calendar-mode';

@Component({
  selector: 'app-inline-calendar',
  templateUrl: './inline-calendar.component.html',
  styleUrls: ['./inline-calendar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: InlineCalendarComponent
    }
  ]
})
export class InlineCalendarComponent implements ControlValueAccessor {

  @Input() maxDate: Date;
  @Input() minDate: Date;
  @Input() mode: CalendarMode;
  @Input() selectedDate = new Date();
  @ViewChild('inlinecalendarTem') inlinecalendarTem: MatCalendar<Date>;
  @Output() viewChanged = new EventEmitter<DateRange>();
  @Input() mapDates: Map<string,Date>;

  isDisabled: boolean;
  CalendarMode = CalendarMode;
  selectedDateRange: DateRange;
  onChange: (selectedDateRange) => {};
  touched: () => void;

  constructor( private renderer: Renderer2) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.mode && this.mode) {
      this.setSelectedAfterChange();
      this.onSelect(this.selectedDate);
    }
    if (changes.mapDates) {
      this.setSelectedAfterChange();
      this.onSelect(this.selectedDate);
    }
    if (changes.selectedDate && this.selectedDate) {
      this.setSelectedDateRange(this.selectedDate);
      if(this.inlinecalendarTem) {
        this.inlinecalendarTem._goToDateInView(this.selectedDate, 'month');
      }
    }
  }

  ngAfterViewInit() {
    const buttons = document
     .querySelectorAll('.mat-calendar-previous-button, .mat-calendar-next-button');

    if (buttons) {
      Array.from(buttons).forEach(button => {
        this.renderer.listen(button, 'click', () => {
          const activeDate = this.inlinecalendarTem.activeDate;
          const firstDay = new Date(activeDate.getFullYear(), activeDate.getMonth(), 1);
          const lastDay = new Date(activeDate.getFullYear(), activeDate.getMonth() + 1, 0);
          const dateRange: DateRange = {
            startDate: firstDay,
            endDate: lastDay
          }
          this.viewChanged.emit(dateRange);
        });
      });
    }
  }

  writeValue(selectedDateRange: DateRange): void {
    this.selectedDateRange = selectedDateRange;
    if(selectedDateRange ! = null) {
      this.selectedDate = this.getMidDateBetweenDates(this.selectedDateRange.startDate, this.selectedDateRange.endDate);
    }
    this.updeteCalendarStyle();
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const eventStyle = this.mapDates.get(dateToString(date)) != null ? 'event-calendar-style' : null;
      if (this.isDateIncludeInSelected(date)) {
        return eventStyle ? 'inline-calendar-style '  + eventStyle : 'inline-calendar-style';
      }
      return eventStyle;
    };
  }

  onSelect(event): void {
    this.selectedDate = event;
    this.updeteCalendarStyle();
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  private getMidDateBetweenDates(startDate: Date, endDate: Date): Date {
    return new Date((startDate.getTime() + endDate.getTime()) / 2);
  }

  private isDateIncludeInSelected(date: Date): boolean {
    const isRange = this.setSelectedDateRange(date);
    this.onChange(this.selectedDateRange);
    return isRange;
  }

  private setSelectedDateRange(date: Date): boolean{
    let startDate;
    let endDate;
    if(this.mode == CalendarMode.MONTH) {
      startDate = new Date( this.selectedDate.getFullYear(),  this.selectedDate.getMonth(), 1);
      endDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 0);
    } else if(this.mode == CalendarMode.WEEK) {
      const currentWeekDay = this.selectedDate.getDay();
      const lessDays = currentWeekDay == 0 ? 6 : currentWeekDay-1
      const stDate =  new Date(this.selectedDate.setDate(this.selectedDate.getDate() - lessDays));
      const enDate = new Date(new Date(stDate).setDate(stDate.getDate() + 6));
      startDate = new Date( stDate.getFullYear(),  stDate.getMonth(), stDate.getDate());
      endDate = new Date( enDate.getFullYear(),  enDate.getMonth(), enDate.getDate());
    } else {
      startDate = this.selectedDate;
      endDate = this.selectedDate;
    }
    let isRange: boolean = date >= startDate && date <= endDate;
    this.selectedDateRange = {
      startDate: startDate,
      endDate: endDate
    }
    return isRange;
  }

  private setSelectedAfterChange() {
    if(this.selectedDateRange) {
      this.selectedDate = this.getMidDateBetweenDates(this.selectedDateRange.startDate, this.selectedDateRange.endDate);
    }
  }

  private updeteCalendarStyle() : void{
    if(this.inlinecalendarTem) {
      this.inlinecalendarTem.updateTodaysDate();
    }
  }

}
