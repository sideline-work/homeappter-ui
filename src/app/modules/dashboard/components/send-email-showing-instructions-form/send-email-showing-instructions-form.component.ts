import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { AppointmentResponse } from '@core/models/showings';

@Component({
  selector: 'app-send-email-showing-instructions-form',
  templateUrl: './send-email-showing-instructions-form.component.html',
  styleUrls: ['./send-email-showing-instructions-form.component.scss']
})
export class SendEmailShowingInstructionsFormComponent implements OnInit {

  @Input() formGroupValue: FormGroup;

  // appointmentStatuses: SelectItem [] = [];
  // requestStatuses: SelectItem [] = [];



  constructor() { }

  ngOnInit(): void {
    // this.appointmentStatuses = APPOINTMENT_STATUSES;
    // this.requestStatuses = REQUEST_STATUSES;
  }

  // getDateFromTime(time: string): any {
  //   if(time != null) {
  //     const hourMin: string []  = time.split(":");
  //     return new Date(this.appointment.date).setHours(parseInt(hourMin[0]), parseInt(hourMin[1]));
  //   }
  // }


}
