import { Component, OnInit } from '@angular/core';
import { MemberService } from '@core/http';
import { UserAccountResponse } from '@core/models/member';
import { LoginData } from '@core/models/session';
import { SessionService } from '@core/services';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  member: UserAccountResponse;

  constructor(
    private sessionService: SessionService,
    private memberService: MemberService
  ) { }

  ngOnInit(): void {
    this.memberService.getMemberProfile().subscribe(
      (res) => {
        this.member = res;
      }
    )
  }

  updateMember(event: UserAccountResponse) {
    // this.memberService.getAgent(this.sessionService.currentUserValue.memberMlsId).subscribe(
    //   (res) => {
    //     this.member = res;
    //   }
    // )
  }


}
