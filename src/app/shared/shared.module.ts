import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule} from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DialogModule} from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import { FullCalendarModule } from 'primeng/fullcalendar';
import {DataViewModule} from 'primeng/dataview';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {PanelModule} from 'primeng/panel';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ListboxModule} from 'primeng/listbox';
import {MultiSelectModule} from 'primeng/multiselect';
import { ChipModule } from 'primeng/chip';
import {BlockUIModule} from 'primeng/blockui';
import {CarouselModule} from 'primeng/carousel';
import {InplaceModule} from 'primeng/inplace';
import {GalleriaModule} from 'primeng/galleria';
import { PasswordModule } from 'primeng/password';
import {OrderListModule} from 'primeng/orderlist';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ChartModule} from 'primeng/chart';
import {AutoCompleteModule} from 'primeng/autocomplete';


const primengModuleImports = [
  InputTextModule,
  PanelMenuModule,
  CardModule,
  SidebarModule,
  ToolbarModule,
  ButtonModule,
  DropdownModule,
  TooltipModule,
  ToastModule,
  ConfirmDialogModule,
  TableModule,
  TabViewModule,
  RadioButtonModule,
  DialogModule,
  DynamicDialogModule,
  CheckboxModule,
  CalendarModule,
  FullCalendarModule,
  DataViewModule,
  AvatarModule,
  AvatarGroupModule,
  InputTextareaModule,
  PanelModule,
  SelectButtonModule,
  ListboxModule,
  ChipModule,
  BlockUIModule,
  CarouselModule,
  InplaceModule,
  GalleriaModule,
  PasswordModule,
  OrderListModule,
  InputSwitchModule,
  ChartModule,
  AutoCompleteModule
];

const primengModuleExports = [
  InputTextModule,
  PanelMenuModule,
  CardModule,
  SidebarModule,
  ToolbarModule,
  ButtonModule,
  DropdownModule,
  TooltipModule,
  ToastModule,
  ConfirmDialogModule,
  TableModule,
  TabViewModule,
  RadioButtonModule,
  DialogModule,
  DynamicDialogModule,
  CheckboxModule,
  CalendarModule,
  FullCalendarModule,
  DataViewModule,
  AvatarModule,
  AvatarGroupModule,
  InputTextareaModule,
  PanelModule,
  SelectButtonModule,
  ListboxModule,
  ChipModule,
  BlockUIModule,
  CarouselModule,
  InplaceModule,
  GalleriaModule,
  PasswordModule,
  OrderListModule,
  InputSwitchModule,
  ChartModule,
  AutoCompleteModule
];

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule} from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { DateAdapter, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';



const materialModuleImports = [
  FlexLayoutModule,
  MatToolbarModule,
  MatButtonModule,
  MatMenuModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatButtonToggleModule,
  MatTreeModule,
  MatBadgeModule,
  MatGridListModule,
  MatRadioModule,
  MatDatepickerModule,
  MatTooltipModule,
  MatDialogModule,
  MatNativeDateModule,
  MatGridListModule,
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MultiSelectModule
];

const materialModuleExports = [
  FlexLayoutModule,
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatMenuModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatRippleModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatButtonToggleModule,
  MatTreeModule,
  MatBadgeModule,
  MatGridListModule,
  MatRadioModule,
  MatDatepickerModule,
  MatTooltipModule,
  MatDialogModule,
  MatNativeDateModule,
  MatGridListModule,
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MultiSelectModule
];

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {NgxPrintModule} from 'ngx-print';

const otherModuleImports = [
  CKEditorModule,
  NgxPrintModule
];

const otherModuleExports = [
  CKEditorModule,
  NgxPrintModule
];

import { CamelToTitleCasePipe, FormErrorsFilterPipe, FormErrorsPipe, HasRolePipe, TableCellPipe, TableHeaderPipe } from './pipes';

const pipes = [
  FormErrorsPipe, FormErrorsFilterPipe, HasRolePipe, TableCellPipe, TableHeaderPipe, CamelToTitleCasePipe
];

import { FormErrorTooltipDirective, ImgFallbackDirective } from './directives';

const directives = [
  FormErrorTooltipDirective,
  ImgFallbackDirective
];
import { NgxSpinnerModule } from 'ngx-spinner';

import {
  AlertComponent,
  DialogComponent,
  DropdownComponent,
  FormCardComponent,
  TableComponent,
  ModalComponent,
  CalendarComponent,
  LoaderComponent,
  InlineCalendarComponent,
  CheckboxListComponent,
  CheckboxDropdownComponent,
  SidebarComponent,
  PanelHeaderComponent,
  AppointmentDetailsFormComponent,
  EntityLinkComponent,
  InplaceTextBoxComponent,
  PasswordFieldComponent,
  DayCalendarViewComponent,
  PreferenceAccessTableComponent,
  PreferenceBlockTimeTableComponent,
  PreferenceContactsTableComponent,
  AppointmentDetailsPageComponent,
  ShowingInstructionOverviewComponent,
  SiteHeaderComponent
 } from './components';
import { DecimalPipe } from '@angular/common';
import { MyDateAdapter } from './services/my-date-adapter.service';

const components = [
  AlertComponent,
  DialogComponent,
  TableComponent,
  DropdownComponent,
  FormCardComponent,
  ModalComponent,
  CalendarComponent,
  LoaderComponent,
  InlineCalendarComponent,
  CheckboxListComponent,
  CheckboxDropdownComponent,
  SidebarComponent,
  PanelHeaderComponent,
  AppointmentDetailsFormComponent,
  EntityLinkComponent,
  InplaceTextBoxComponent,
  PasswordFieldComponent,
  DayCalendarViewComponent,
  PreferenceAccessTableComponent,
  PreferenceBlockTimeTableComponent,
  PreferenceContactsTableComponent,
  AppointmentDetailsPageComponent,
  ShowingInstructionOverviewComponent,
  SiteHeaderComponent
]

@NgModule({
  declarations: [...components, ...pipes, ...directives],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ...primengModuleImports,
    ...materialModuleImports,
    ...otherModuleImports
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ...primengModuleExports,
    ...materialModuleExports,
    ...otherModuleExports,
    ...pipes,
    ...components,
    ...directives
  ],
  providers: [CamelToTitleCasePipe, DecimalPipe, TitleCasePipe, CurrencyPipe, HasRolePipe, FormGroupDirective, ImgFallbackDirective, {provide: DateAdapter, useClass: MyDateAdapter},
  ],
})
export class SharedModule { }
