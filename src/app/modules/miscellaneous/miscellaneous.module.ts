import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscellaneousRoutingModule } from './miscellaneous-routing.module';
import { FeedbackQuestionsPageComponent } from './pages/feedback-questions-page/feedback-questions-page.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [FeedbackQuestionsPageComponent],
  imports: [
    CommonModule,
    MiscellaneousRoutingModule,
    SharedModule
  ]
})
export class MiscellaneousModule { }
