import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import { ProfileSummaryComponent } from './components/profile-summary/profile-summary.component';
import { SharedModule } from '@shared/shared.module';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';


@NgModule({
  declarations: [ViewProfileComponent, ProfileSummaryComponent, ProfileDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MemberRoutingModule
  ]
})
export class MemberModule { }
