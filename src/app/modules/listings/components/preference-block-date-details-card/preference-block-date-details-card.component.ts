import { EventEmitter, Input } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PreferenceBlockDate } from '@core/models/listing';

@Component({
  selector: 'app-preference-block-date-details-card',
  templateUrl: './preference-block-date-details-card.component.html',
  styleUrls: ['./preference-block-date-details-card.component.scss']
})
export class PreferenceBlockDateDetailsCardComponent implements OnInit, OnChanges {

  @Input() item: PreferenceBlockDate;
  @Output() onDeleteBlockDate = new EventEmitter<any>();
  @Output() onEditBlockDate = new EventEmitter<any>();
  startDateTime: Date;
  endDateTime: Date;

  constructor() { }

  ngOnInit(): void {
    if(this.item) {
      this.udpateDateTime();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item && this.item) {
     this.udpateDateTime();
    }
  }

  private udpateDateTime() {
    this.startDateTime = this.getDateFromTime(this.item.startTime);
    this.endDateTime = this.getDateFromTime(this.item.endTime);
  }

  private getDateFromTime(time: string): any {
    if(time != null) {
      const hourMin: string []  = time.split(":");
      return new Date(new Date()).setHours(parseInt(hourMin[0]), parseInt(hourMin[1]));
    }
  }

  onDelete() {
    this.onDeleteBlockDate.emit(this.item);
  }

  onEdit() {
    this.onEditBlockDate.emit(this.item);
  }


}
