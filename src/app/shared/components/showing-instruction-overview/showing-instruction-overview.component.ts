import { SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { APPROVAL_TYPES } from '@core/constants/listing/approval-types';
import { HOME_STATUSES } from '@core/constants/listing/home-statuses';
import { PreferenceService } from '@core/http/preference.service';
import { ErrorResponse } from '@core/models/api';
import { Property } from '@core/models/listing';
import { ConfigBeforeNotice } from '@core/models/listing/config-before-notice';
import { ConfigShowingDuration } from '@core/models/listing/config-showing-duration';
import { ShowingInstruction } from '@core/models/listing/showing-instruction';
import { SelectItem } from "primeng/api";
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-showing-instruction-overview',
  templateUrl: './showing-instruction-overview.component.html',
  styleUrls: ['./showing-instruction-overview.component.scss']
})
export class ShowingInstructionOverviewComponent implements OnInit {

  @Input() showingInstruction: any;
  @Input() isPrintView: boolean;

  approvalTypes: SelectItem [];
  endDateTime: Date;
  homeStatuses: SelectItem [] = [];
  selectedApprovalType: string;
  selectedHomeStatus: string;
  selectedMinimumHours: string;
  selectedShowingDuration: string;
  startDateTime: Date;

  constructor(
    private preferenceService: PreferenceService,
  ) { }

  ngOnInit(): void {
    this.setDropdownValues();
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

          if(this.showingInstruction) {
            const minimumHours = notices.find(item => item.value == this.showingInstruction.minsBeforeNotice);
            const showingDuration = durations.find(item => item.value == this.showingInstruction.showingDuration);

            if(minimumHours) {
              this.selectedMinimumHours = minimumHours.duration;
            }
            if(showingDuration) {
              this.selectedShowingDuration = showingDuration.duration;
            }
          }
        },
        (err: ErrorResponse) => {
          console.log(err);
          // this.alertService.error(err);
        }
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.showingInstruction && this.showingInstruction) {
      console.log(this.showingInstruction);
      if(this.showingInstruction.approvalType) {
        const approvalType = this.approvalTypes.find(item =>
          item.value == this.showingInstruction.approvalType
        );
        this.selectedApprovalType = approvalType ? approvalType.label : this.showingInstruction.approvalType;
      }

      if(this.showingInstruction.homeStatus) {
        const homeStatus = this.homeStatuses.find(item =>
          item.value == this.showingInstruction.homeStatus
        );
        this.selectedHomeStatus = homeStatus ? homeStatus.label : this.showingInstruction.homeStatus;
      }

      if(this.showingInstruction.minsBeforeNotice) {
        const homeStatus = this.homeStatuses.find(item =>
          item.value == this.showingInstruction.homeStatus
        );
        this.selectedHomeStatus = homeStatus ? homeStatus.label : this.showingInstruction.homeStatus;
      }

      if(this.isPrintView) {
        this.startDateTime = this.showingInstruction.startTime;
        this.endDateTime = this.showingInstruction.endTime;
      } else {
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
  }

}
