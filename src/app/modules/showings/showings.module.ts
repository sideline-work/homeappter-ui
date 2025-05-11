import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowingsRoutingModule } from './showings-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AppointmentPreviewComponent } from './components/appointment-preview/appointment-preview.component';
import { CalendarShowingsComponent } from './pages/calendar-showings/calendar-showings.component';
import { ShowingCalendarFilterComponent } from './components/showing-calendar-filter/showing-calendar-filter.component';
import { ShowingCalendarComponent } from './components/showing-calendar/showing-calendar.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

const otherModuleImports = [
  CKEditorModule
];

const otherModuleExports = [
  CKEditorModule
];

@NgModule({
  declarations: [CalendarShowingsComponent, AppointmentPreviewComponent, ShowingCalendarFilterComponent, ShowingCalendarComponent],
  imports: [
    CommonModule, SharedModule, ShowingsRoutingModule, CKEditorModule
  ]
})
export class ShowingsModule { }
