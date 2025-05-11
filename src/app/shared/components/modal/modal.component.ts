import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, ContentChildren, QueryList, TemplateRef } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() header: string;
  @Input() height: string;
  @Input() width: string;
  @Input() styleClass: string;
  @Input() visible: boolean;
  @Input() minHeight: string = '50vh';
  @Input() minWidth: string;

  @Output() visibleChange = new EventEmitter<boolean>();
  @ContentChildren(TemplateRef) tempList: QueryList<TemplateRef<any>>;
  templateList: TemplateRef<any>[];

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
    ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    if (this.mobileQuery && this.mobileQuery.matches) {
      this.minWidth = '85vw';
      this.minHeight = '85vh';
    }
  }

  ngOnDestroy(): void {
     if (this.mobileQuery && this.mobileQuery.matches) {
      this.mobileQuery.removeListener(this._mobileQueryListener);
    }
  }

  ngAfterContentInit(): void {
    this.templateList = this.tempList.toArray();
    if (this.mobileQuery && this.mobileQuery.matches) {
      this.minWidth = '85vw';
      this.minHeight = '85vh';
    }
  }
  onHideModal(): void {
    this.visibleChange.emit(false);
  }

  getTemplate(colTemplateRefName: string): TemplateRef<any> {
    return this.templateList.find(
      (t) => (t as any)._declarationTContainer.localNames[0] === colTemplateRefName
    );
  }
}
