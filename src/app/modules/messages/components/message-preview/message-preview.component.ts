import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { LoginData } from '@core/models/session';
import { AppointmentResponse } from '@core/models/showings';
import { MessagesService, SessionService } from '@core/services';

@Component({
  selector: 'app-message-preview',
  templateUrl: './message-preview.component.html',
  styleUrls: ['./message-preview.component.scss']
})
export class MessagePreviewComponent implements OnInit {

  @Input() message: any;

  @Output() onShowMessage = new EventEmitter<any>();

  currentUser: LoginData;


  constructor(private messagesService: MessagesService,
    private sessionService: SessionService
    ) {
      this.currentUser = this.sessionService.currentUserValue;
     }

  ngOnInit(): void {
  }

  onClickRoom() {
    // this.onShowMessage.emit(this.message);
    this.messagesService.loadSubject(this.message);
  }

  getDateFromTime(time: string): any {
    if(time != null) {
      const hourMin: string []  = time.split(":");
      return new Date(this.message.date).setHours(parseInt(hourMin[0]), parseInt(hourMin[1]));
    }
  }

}
