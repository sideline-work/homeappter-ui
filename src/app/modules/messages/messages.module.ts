import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { SharedModule } from '@shared/shared.module';
import { MessagesRoutingModule } from './messages-routing.module';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MessageDetailsComponent } from './components/message-details/message-details.component';
import { MessagePreviewComponent } from './components/message-preview/message-preview.component';



@NgModule({
  declarations: [MessagesPageComponent, MessageListComponent, MessageDetailsComponent, MessagePreviewComponent],
  imports: [
    SharedModule, CommonModule, MessagesRoutingModule
  ]
})
export class MessagesModule { }
