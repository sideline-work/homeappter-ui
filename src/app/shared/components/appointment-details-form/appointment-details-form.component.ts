import { AppointmentResponse, AppointmentStatus } from '@core/models/showings';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { getDateFromTime } from '@core/helpers/get-date-from-time';
import { ROLES } from '@core/constants/auth';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ShowingInstruction } from '@core/models/listing/showing-instruction';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-appointment-details-form',
  templateUrl: './appointment-details-form.component.html',
  styleUrls: ['./appointment-details-form.component.scss']
})
export class AppointmentDetailsFormComponent implements OnInit {

  readonly AppointmentStatus = AppointmentStatus;
  readonly ROLES = ROLES;

  public Editor = ClassicEditor;

  @Input() appointment: AppointmentResponse;
  @Input() remarks: string;
  @Output() remarksChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() showingInstruction: ShowingInstruction;
  startDateTime: Date;
  endDateTime: Date;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.showingInstruction && this.showingInstruction) {
      const stringDate = this.showingInstruction.workTime;
      let startDate;
      let endDate;

      if(stringDate) {
        const startEndTime: string[]  = stringDate.split("-");
        const starthourMin: string []  = startEndTime[0].trim().split(":");
        const endhourMin: string []  = startEndTime[1].trim().split(":");
        startDate = new Date().setHours(parseInt(starthourMin[0]), parseInt(starthourMin[1]));
        endDate = new Date().setHours(parseInt(endhourMin[0]), parseInt(endhourMin[1]));
      }

      this.startDateTime = startDate ? new Date(startDate) : null;
      this.endDateTime = endDate ? new Date(endDate) : null;
    }
  }



  getDateFromTime(time: string): any {
    if(time != null) {
      const hourMin: string []  = time.split(":");
      return new Date(this.appointment.date).setHours(parseInt(hourMin[0]), parseInt(hourMin[1]));
    }
  }

  changeValue(event) {
    this.remarksChange.emit(this.remarks);
  }

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }

}
