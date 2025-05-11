import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { DialogOption, DialogCommand } from '@core/models/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private subject = new Subject<DialogCommand>();

  constructor(private router: Router) {}

  getDialogs$(): Observable<DialogCommand> {
    return this.subject.asObservable();
  }

  openConfirmDialog(input: DialogOption): void {
    const params = this.createDialogCommand('confirm', input);
    this.subject.next(params);
  }

  openQuestionDialog(input: DialogOption): void {
    const params = this.createDialogCommand('question', input);
    this.subject.next(params);
  }

  openErrorDialog(input: DialogOption): void {
    const params = this.createDialogCommand('error', input);
    params.rejectVisible = false;
    this.subject.next(params);
  }

  openInfoDialog(input: DialogOption): void {
    const params = this.createDialogCommand('info', input);
    if (params.header === undefined) {
      params.header = 'Info';
    }
    params.rejectVisible = false;
    this.subject.next(params);
  }

  private createDialogCommand(type: string, input: DialogOption): DialogCommand {
    if (!input.key) {
      input.key = this.router.url;
    }
    const message = input.message
      ? input.message
      : input.messageKey
      ? input.messageKey
      : undefined;
    const header = input.header
      ? input.header
      : input.headerKey
      ? input.headerKey
      : undefined;
    const acceptLabel = input.acceptKey
      ? input.acceptKey
      : 'OK';
    const rejectLabel = input.rejectKey
      ? input.rejectKey
      : 'Cancel';
    const command = {
      type,
      header,
      message,
      disableIcon: input.disableIcon,
      acceptLabel,
      rejectLabel,
      acceptVisible: input.acceptVisible === undefined ? true : input.acceptVisible,
      rejectVisible: input.rejectVisible === undefined ? true : input.rejectVisible,
      key: input.key + '-' + type, // key is used to specify the dialog type
      styleClass: input.styleClass,
      onAccept: input.onAccept,
      onReject: input.onReject,
    };
    return command;
  }
}
