import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgOtpInputModule } from 'ng-otp-input';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from 'primeng/dialog';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { OverlayModule } from 'primeng/overlay';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SidebarModule } from 'primeng/sidebar';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TeacherRoutingModule } from './teacher-routing.module';
import { HomeComponent } from './components/home/home.component';

export const defaultDeclarations = [HomeComponent];
export const defaultImports = [
    CommonModule,
    TabMenuModule,
    SidebarModule,
    MenuModule,
    InputTextModule,
    ChipsModule,
    ButtonModule,
    InputMaskModule,
    OverlayModule,
    CarouselModule,
    EditorModule,
    CalendarModule,
    TableModule,
    OverlayPanelModule,
    FieldsetModule,
    AvatarModule,
    FileUploadModule,
    PanelModule,
    TabViewModule,
    DropdownModule,
    RadioButtonModule,
    SplitterModule,
    AutoCompleteModule,
    CheckboxModule,
    CardModule,
    DragDropModule,
    AccordionModule,
    FullCalendarModule,
    FormsModule,
    FontAwesomeModule,
    ListboxModule,
    PanelMenuModule,
    PaginatorModule,
    MessagesModule,
    TagModule,
    TeacherRoutingModule,
    ButtonModule,
    DialogModule,
    DynamicDialogModule,
    NgOtpInputModule,
    InputSwitchModule,
    ReactiveFormsModule,
    RadioButtonModule,
];
export const defaultProviders = [DatePipe];
