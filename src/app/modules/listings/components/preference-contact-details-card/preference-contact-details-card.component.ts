import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PreferenceContacts } from '@core/models/listing';

@Component({
  selector: 'app-preference-contact-details-card',
  templateUrl: './preference-contact-details-card.component.html',
  styleUrls: ['./preference-contact-details-card.component.scss']
})
export class PreferenceContactDetailsCardComponent implements OnInit {

  @Input() item: PreferenceContacts;
  @Output() onDeleteContact = new EventEmitter<any>();
  @Output() onEditContact = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete() {
    this.onDeleteContact.emit(this.item);
  }

  onEdit() {
    this.onEditContact.emit(this.item);
  }

}
