import { Component, Input, OnInit } from '@angular/core';
import { UserAccountResponse } from '@core/models/member';
import { LoginData } from '@core/models/session';
import { SessionService } from '@core/services';

@Component({
  selector: 'app-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.scss']
})
export class ProfileSummaryComponent implements OnInit {

  @Input() member: UserAccountResponse;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
