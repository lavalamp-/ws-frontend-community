import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GreetingComponent } from './greeting.component';
import { GreetingRoutingModule } from './greeting-routing.module';
import { WsFormsModule } from "../components/ws-forms/ws-forms.module";
import { LoginPageComponent } from './login-page/login-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { VerifyEmailPageComponent } from './verify-email-page/verify-email-page.component';
import { ForgotPasswordSentPageComponent } from './forgot-password-sent-page/forgot-password-sent-page.component';
import { VerifyForgotPasswordPageComponent } from './verify-forgot-password-page/verify-forgot-password-page.component';
import {WsWidgetsModule} from "../components/ws-widgets/ws-widgets.module";
import { SetupAccountPageComponent } from './setup-account-page/setup-account-page.component';
import { GreetingNavigationComponent } from './components/greeting-navigation/greeting-navigation.component';


@NgModule({
  imports: [
    CommonModule,
    GreetingRoutingModule,
    WsFormsModule,
    ReCaptchaModule,
    WsWidgetsModule,
  ],
  declarations: [
    GreetingComponent,
    LoginPageComponent,
    ForgotPasswordPageComponent,
    SignUpPageComponent,
    VerifyEmailPageComponent,
    ForgotPasswordSentPageComponent,
    VerifyForgotPasswordPageComponent,
    SetupAccountPageComponent,
    GreetingNavigationComponent]
})
export class GreetingModule { }
