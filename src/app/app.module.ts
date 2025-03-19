import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NgOtpInputModule } from 'ng-otp-input';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AngularPhoneNumberInput } from 'angular-phone-number-input';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        AngularPhoneNumberInput,
        FontAwesomeModule,
        ToastModule,
        ProgressSpinnerModule,
        NgOtpInputModule,
        ConfirmDialogModule,
    ],
    providers: [
        DialogService,
        DynamicDialogRef,
        ConfirmationService,
        MessageService,
        DynamicDialogConfig,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
