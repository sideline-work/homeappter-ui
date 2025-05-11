import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { APPROVAL_TYPES, HOME_STATUSES } from '@core/constants/listing';
import { PreferenceService } from '@core/http/preference.service';
import { ErrorResponse } from '@core/models/api';
import { PrefAccess, PrefBlockDate, PrefContacts, PreferenceAccess, PreferenceBlockDate, PreferenceContacts, Property, PropertyPreferenceEntity, PropertyPreferenceReq } from '@core/models/listing';
import { ConfigBeforeNotice } from '@core/models/listing/config-before-notice';
import { ConfigShowingDuration } from '@core/models/listing/config-showing-duration';
import { timeRangeValidator } from '@core/validators/time-range-validator.directive';
import { SelectItem } from "primeng/api";
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PreferenceBlockDateModalComponent } from '../preference-block-date-modal/preference-block-date-modal.component';
import { PreferenceContactModalComponent } from '../preference-contact-modal/preference-contact-modal.component';
import { AlertService, DialogService, SessionService } from '@core/services';
import { PreferenceAccessModalComponent } from '../preference-access-modal/preference-access-modal.component';
import { getTimeFromDate } from '@core/helpers';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Input } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core';
import { preferenceListValidator } from '@core/validators/preference-list-validator.directive';
import { ShowingInstruction } from '@core/models/listing/showing-instruction';

@Component({
  selector: 'app-showing-instructions',
  templateUrl: './showing-instructions.component.html',
  styleUrls: ['./showing-instructions.component.scss']
})
export class ShowingInstructionsComponent implements OnInit, OnChanges {

  @Input() listing: Property;
  startDateTime: Date;
  endDateTime: Date;

  approvalTypes: SelectItem [];
  contacts: FormArray;
  enableDraft: boolean = false;
  enabledListing: boolean = false;
  hrsBeforeNoticeOptions: SelectItem [] = [];
  homeStatuses: SelectItem [] = [];
  listingInstructionsForm: FormGroup;
  mlsNumber: string;
  propertyPreference: PropertyPreferenceEntity = {} as PropertyPreferenceEntity;
  showingDurationOptions: SelectItem [] = [];
  showingInstruction: ShowingInstruction;
  workHoursOptions: SelectItem [] = [];

  // convenience getter for form controls
  get f(): { [key: string]: AbstractControl } {
    return this.listingInstructionsForm.controls;
  }

  get fgErrors(): { [key: string]: ValidationErrors } {
    return this.listingInstructionsForm.errors;
  }

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dialogService: DialogService,
    private preferenceService: PreferenceService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.mlsNumber = this.route.snapshot.paramMap.get('mlsNumber');
    this.initializeForm();
    this.setDropdownValues();
    this.getPreferenceDetails();
    this.preferenceService.getAccessUpdates$().subscribe((res) => {
      if(res) {
        this.getAccess();
      }
    });
    this.preferenceService.getBlockDateUpdates$().subscribe((res) => {
      if(res) {
        this.getBlockDates();
      }
    });
    this.preferenceService.getContactsUpdates$().subscribe((res) => {
      if(res) {
        this.getContacts();
      }
    });
    this.listingInstructionsForm.statusChanges.subscribe((status) => {
      console.log(this.listing);
      if(this.enabledListing == true) {
        this.enableDraft = status == 'INVALID' ? true : false;
      }
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.listing && this.listing) {
      console.log(this.listing);

      this.enabledListing = this.listing.showingEnabled;
      if(!this.enabledListing) {
        this.enableDraft = true;
      }
    }
  }


  openAccessDialog(preferenceAccess?: PrefAccess): void {
    const dialogRef = this.dialog.open(PreferenceAccessModalComponent, {
      width: '40vw',
      data: {
        preferenceAccess: preferenceAccess,
        mlsNumber: this.mlsNumber
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openBlockDateDialog(preferenceBlockDate?: PrefBlockDate): void {
    const dialogRef = this.dialog.open(PreferenceBlockDateModalComponent, {
      width: '30vw',
      data: {
        preferenceBlockDate: preferenceBlockDate,
        mlsNumber: this.mlsNumber
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openContactDialog(preferenceContact?: PrefContacts): void {
    const dialogRef = this.dialog.open(PreferenceContactModalComponent, {
      width: '40vw',
      data: {
        preferenceContact: preferenceContact,
        mlsNumber: this.mlsNumber
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onCancel() {
    this.spinner.show();
    const state = this.propertyPreference.preferenceId == null ? "NEW" : "EDIT";
    this.preferenceService.deleteSubPreference(this.mlsNumber, state).subscribe(
      (res)=> {
        this.spinner.hide();
        this.router.navigate(['/home/listings/new-listing/']);
      },
      (err: ErrorResponse) => {
        this.spinner.hide();
        console.log(err);
        // this.alertService.error(err);
      }
    );
  }

  onDraft() {
    this.saveListingInstructions('DRAFT');
  }

  onDeleteAccess(item: PreferenceAccess) {
    this.dialogService.openQuestionDialog({
      header:'Confirm Delete',
      message: 'Are you sure you want to delete this access?',
      onAccept: () => {
        this.deletePreference(item.accessId, 'access');
      },
    });
  }

  onDeleteBlockDate(item: PreferenceBlockDate) {
    this.dialogService.openQuestionDialog({
      header:'Confirm Delete',
      message: 'Are you sure you want to delete this block?',
      onAccept: () => {
        this.deletePreference(item.blockId, 'block');
      },
    });
  }

  onDeleteContact(item: PreferenceContacts) {
    this.dialogService.openQuestionDialog({
      header:'Confirm Delete',
      message: 'Are you sure you want to delete this contact?',
      onAccept: () => {
        this.deletePreference(item.contactPrefId, 'contacts');
      },
    });
  }

  onEditAccess(item: any) {
    this.openAccessDialog(item);
  }

  onEditBlockDate(item: any) {
    this.openBlockDateDialog(item);
  }

  onEditContact(item: any) {
    this.openContactDialog(item);
  }

  onSave() {
    this.saveListingInstructions('COMPLETE');
  }

  private deletePreference(id: number, form: string) {
    this.preferenceService.deletePreference(id, form).subscribe(
      (res)=> {
        console.log(res);
      },
      (err: ErrorResponse) => {
        console.log(err);
        // this.alertService.error(err);
      }
    );
  }

  private initializeForm() {
    this.listingInstructionsForm = this.formBuilder.group({
      mlsNumber: [this.mlsNumber],
      preferenceId: [ null ],
      approvalType: [ null, [Validators.required]],
      homeStatus:  [null, [Validators.required]],
      minsBeforeNotice:  [null, [Validators.required]],
      worksHours:  [null],
      startTime:  [null, [Validators.required]],
      endTime:  [null, [Validators.required]],
      showingDuration:  [null, [Validators.required]],
      overlapping:  [null],
      accompaniedShowing:  [null],
      accessList:  [[]],
      blockDateList:  [[]],
      contactList:  [[]],
      showingInstructions:  [null, [Validators.required]],
      privateNotes:  [null],
      preferenceStatus:  [null],
    }, {
      validators: [timeRangeValidator(), preferenceListValidator()],
    });
  }

  private getAccess(): void {
    this.preferenceService.getListAccessByMlsNumber(this.mlsNumber).subscribe(
      (res)=> {
        this.propertyPreference.accessList = res;
        this.listingInstructionsForm.controls['accessList'].setValue(res);
        this.listingInstructionsForm.controls['accessList'].markAsDirty();
      },
      (err: ErrorResponse) => {

      }
    );
  }

  private getBlockDates(): void {
    this.preferenceService.getListBlockByMlsNumber(this.mlsNumber).subscribe(
      (res)=> {
        this.propertyPreference.blockDateList = res;
        this.listingInstructionsForm.controls['blockDateList'].setValue(res);
        this.listingInstructionsForm.controls['blockDateList'].markAsDirty();

      },
      (err: ErrorResponse) => {

      }
    );
  }

  private getContacts(): void {
    this.preferenceService.getListContactByMlsNumber(this.mlsNumber).subscribe(
      (res)=> {
        this.propertyPreference.contactList = res;
        this.listingInstructionsForm.controls['contactList'].setValue(res);
        this.listingInstructionsForm.controls['contactList'].markAsDirty();
      },
      (err: ErrorResponse) => {

      }
    );
  }

  private getPreferenceDetails() {
    this.preferenceService.getListByMemberMlsId(this.mlsNumber).subscribe(
      (res)=> {
        if(res) {
          this.propertyPreference = res;
        }
        console.log(res);
        if(this.propertyPreference) {
          const stringDate = this.propertyPreference.workTime;
          let startDate;
          let endDate;

          if(stringDate) {
            const startEndTime: string[]  = stringDate.split("-");
            const starthourMin: string []  = startEndTime[0].trim().split(":");
            const endhourMin: string []  = startEndTime[1].trim().split(":");
            startDate = new Date().setHours(parseInt(starthourMin[0]), parseInt(starthourMin[1]));
            endDate = new Date().setHours(parseInt(endhourMin[0]), parseInt(endhourMin[1]));
          }

          this.listingInstructionsForm.patchValue({
            approvalType: this.propertyPreference.approvalType,
            homeStatus: this.propertyPreference.homeStatus,
            minsBeforeNotice: this.propertyPreference.minsBeforeNotice,
            showingDuration:  this.propertyPreference.showingDuration,
            overlapping: this.propertyPreference.overlapping,
            accompaniedShowing: this.propertyPreference.accompaniedShowing,
            showingInstructions: this.propertyPreference.showingInstructions,
            privateNotes: this.propertyPreference.privateNotes,
            startTime: startDate ? new Date(startDate) : null,
            endTime: endDate ? new Date(endDate) : null,
            preferenceId: this.propertyPreference.preferenceId,
            accessList: this.propertyPreference.accessList,
            blockDateList: this.propertyPreference.blockDateList,
            contactList: this.propertyPreference.contactList,
          });
          this.showingInstruction = this.listingInstructionsForm.value;
        }
        //this.alertService.success('/home/listings', '', "Appointment successfully scheduled");
      },
      (err: ErrorResponse) => {
        console.log(err);
        // this.alertService.error(err);
      }
    )
  }

  private setDropdownValues() {
    this.approvalTypes = APPROVAL_TYPES;
    this.homeStatuses = HOME_STATUSES;
    forkJoin({
      noticeList: this.preferenceService.getb4NoticeList(),
      durationList: this.preferenceService.getShowingDurationList(),
    })
      .pipe(finalize(() => null))
      .subscribe(
        (res) => {
          const notices: ConfigBeforeNotice [] = res.noticeList;
          const durations: ConfigShowingDuration [] = res.durationList;
          notices.forEach((notice) => {
            this.hrsBeforeNoticeOptions.push({
              label: notice.duration,
              value: notice.value
            })
          });
          durations.forEach((duration) => {
            this.showingDurationOptions.push({
              label: duration.duration,
              value: duration.value
            })
          })
        },
        (err: ErrorResponse) => {
          console.log(err);
          // this.alertService.error(err);
        }
      );
  }

  private saveListingInstructions(preferenceStatus: string) {
    this.spinner.show();
    const formValues = this.listingInstructionsForm.value;
    const pref: PropertyPreferenceReq = {
      ... formValues,
      workTime: (formValues.startTime ==null || formValues.endTime == null) ? null :  getTimeFromDate(formValues.startTime) + "-" + getTimeFromDate(formValues.endTime),
      preferenceStatus: preferenceStatus
    }
    this.preferenceService.savePreference(pref).subscribe(
      (res)=> {
        this.spinner.hide();
        this.alertService.success('/home/listings/new-listing', '', 'Listing Successfully Saved');
        this.router.navigate(['/home/listings/new-listing/']);
      },
      (err: ErrorResponse) => {
        console.log(err);
        this.spinner.hide();
        // this.alertService.error(err);
      }
    );
  }

}
