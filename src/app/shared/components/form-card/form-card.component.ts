import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss']
})
export class FormCardComponent implements OnInit {
  @Input() withFooterUnderline: boolean = false;
  @ContentChild('formCardHeader', {static: true}) formCardHeaderTemplate: TemplateRef<any>;
  @ContentChild('formCardBody', {static: true}) formCardBodyTemplate: TemplateRef<any>;
  @ContentChild('formCardFooter', {static: true}) formCardFooterTemplate: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
