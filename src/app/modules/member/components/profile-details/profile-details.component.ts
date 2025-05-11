import { OnChanges, SimpleChanges } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MemberService } from '@core/http';
import { UserAccountResponse } from '@core/models/member';
import { LoginData } from '@core/models/session';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit, OnChanges {

  profileForm: FormGroup;

  @Input() member: UserAccountResponse;
  @Output() memberChange = new EventEmitter<any>();

  constructor(
    private memberService: MemberService,
    private sessionService: MemberService
  ) { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      uid: new FormControl(null),
      memberMlsId: new FormControl(null),
      fullname: new FormControl(null),
      email: new FormControl(null),
      phoneNumber: new FormControl(null),
      role: new FormControl(null),
      status: new FormControl(null),
      photo: new FormControl(null),
      receivedNotif: new FormControl(null),
      dateRegistered: new FormControl(null)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.member && this.member) {
      this.profileForm.setValue(this.member);
    }
  }

  updateMemberProfile(event: any) {
    this.memberService.updateProfile(this.profileForm.value).subscribe(
      (res) => {
        this.member = res;
        this.memberChange.emit(this.member);
      }
    )
  }

}
