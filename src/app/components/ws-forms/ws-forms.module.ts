import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { NewOrganizationFormComponent } from './new-organization-form/new-organization-form.component';
import { NetworkFormComponent } from './network-form/network-form.component';
import { MaterialModule } from "@angular/material";
import { ReCaptchaModule } from 'angular2-recaptcha';
import { EqualValidator } from './equal-validator.directive';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
import { NetworkUploadFormComponent } from './network-upload-form/network-upload-form.component';
import {FileUploadModule} from 'ng2-file-upload';
import { DomainNameFormComponent } from './domain-name-form/domain-name-form.component';
import { DomainNameUploadFormComponent } from './domain-name-upload-form/domain-name-upload-form.component';
import { InputHintComponent } from './input-hint/input-hint.component';
import { SetupAccountFormComponent } from './setup-account-form/setup-account-form.component';
import { StripeTokenFormComponent } from './stripe-token-form/stripe-token-form.component';
import {CustomFormsModule} from "ng2-validation";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    ReCaptchaModule,
    FileUploadModule,
    CustomFormsModule,
  ],
  declarations: [
    LoginFormComponent,
    ForgotPasswordFormComponent,
    SignUpFormComponent,
    NewOrganizationFormComponent,
    NetworkFormComponent,
    EqualValidator,
    ChangePasswordFormComponent,
    ResetPasswordFormComponent,
    NetworkUploadFormComponent,
    DomainNameFormComponent,
    DomainNameUploadFormComponent,
    InputHintComponent,
    SetupAccountFormComponent,
    StripeTokenFormComponent
  ],
  exports: [
    LoginFormComponent,
    ForgotPasswordFormComponent,
    SignUpFormComponent,
    NewOrganizationFormComponent,
    NetworkFormComponent,
    ChangePasswordFormComponent,
    ResetPasswordFormComponent,
    NetworkUploadFormComponent,
    DomainNameFormComponent,
    DomainNameUploadFormComponent,
    SetupAccountFormComponent,
    StripeTokenFormComponent,
  ]
})
export class WsFormsModule { }
