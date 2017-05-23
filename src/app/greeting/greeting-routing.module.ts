import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GreetingComponent } from './greeting.component';
import { LoginPageComponent } from "./login-page/login-page.component";
import {ForgotPasswordPageComponent} from "./forgot-password-page/forgot-password-page.component";
import {SignUpPageComponent} from "./sign-up-page/sign-up-page.component";
import {VerifyEmailPageComponent} from "./verify-email-page/verify-email-page.component";
import {ForgotPasswordSentPageComponent} from "./forgot-password-sent-page/forgot-password-sent-page.component";
import {VerifyForgotPasswordPageComponent} from "./verify-forgot-password-page/verify-forgot-password-page.component";
import {SetupAccountPageComponent} from "./setup-account-page/setup-account-page.component";

const greetingRoutes: Routes = [
  {
    path: 'greeting',
    component: GreetingComponent,
    children: [
      {
        path: '',
        redirectTo: 'log-in',
        pathMatch: 'full'
      },
      {
        path: 'log-in',
        component: LoginPageComponent,
      },
      {
        path: 'sign-up',
        component: SignUpPageComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordPageComponent
      },
      {
        path: 'forgot-password-sent',
        component: ForgotPasswordSentPageComponent
      },
      {
        path: 'verify-forgot-password/:emailToken/:userUuid',
        component: VerifyForgotPasswordPageComponent
      },
      {
        path: 'verify-email/:emailToken/:userUuid',
        component: VerifyEmailPageComponent
      },
      {
        path: 'setup-account/:emailToken/:userUuid',
        component: SetupAccountPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(greetingRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GreetingRoutingModule { }
