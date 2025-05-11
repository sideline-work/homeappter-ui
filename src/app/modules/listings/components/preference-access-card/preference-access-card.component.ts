import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PreferenceAccess } from '@core/models/listing';

@Component({
  selector: 'app-preference-access-card',
  templateUrl: './preference-access-card.component.html',
  styleUrls: ['./preference-access-card.component.scss']
})
export class PreferenceAccessCardComponent implements OnInit {

  @Input() item: PreferenceAccess;
  @Output() onDeleteAccess = new EventEmitter<any>();
  @Output() onEditAccess = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete() {
    this.onDeleteAccess.emit(this.item);
  }

  onEdit() {
    this.onEditAccess.emit(this.item);
  }

}
