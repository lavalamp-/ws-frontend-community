import { Component, OnInit } from '@angular/core';
import {ApiErrorService} from "../../services/api-services/api-error.service";
import {AuthService} from "../../services/api-services/auth.service";
import { ActivatedRoute } from '@angular/router';
import {FormGroup} from "@angular/forms";
import {NotificationsService} from "angular2-notifications";
import {Router} from "@angular/router";
import {WsTitleService} from "../../services/ui-services/ws-title.service";
import {ErrorApiResponse} from "../../services/api-services/models/responses/error-api-response.interface";
import {flyInOut} from "../../animations";

@Component({
  selector: 'ws-verify-forgot-password-page',
  templateUrl: './verify-forgot-password-page.component.html',
  styleUrls: ['./verify-forgot-password-page.component.css'],
  host: {
    '[@flyInOut]': 'true',
  },
  animations: [
    flyInOut,
  ],
  styles: [':host { width: 100%; }']
})
export class VerifyForgotPasswordPageComponent implements OnInit {

  private sub: any;
  private emailToken: string;
  private userUuid: string;
  private response: string;
  private tokenVerified: boolean;
  private formSubmitted: boolean;
  private resetPasswordForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private errorService: ApiErrorService,
    private router: Router,
    private titleService: WsTitleService,
    private notifyService: NotificationsService,
  ) { }

  ngOnInit() {
    this.tokenVerified = false;
    this.titleService.currentTitle = 'Verify Forgotten Password';
    this.sub = this.route.params.subscribe(params => {
      this.emailToken = params['emailToken']; // (+) converts string 'id' to a number
      this.userUuid = params['userUuid'];
    });
  }

  private onEnterPressed(): void {
    this.onResetPasswordClicked();
  }

  private onResetPasswordClicked(): void {
    if (this.resetPasswordForm.value.newPassword == this.resetPasswordForm.value.newPasswordRepeat) {
      this.submitVerifyResetPassword();
    } else {
      this.formSubmitted = true;
      this.response = 'Your new password\'s don\'t match';
    }
  }

  private onVerifyForgotPasswordSuccess(response: Object): void {
    this.tokenVerified = true;
    this.formSubmitted = true;
    this.notifyService.success('Your password was successfully changed', 'Please go ahead and log in to start using Web Sight.');
    this.router.navigate(['/greeting/log-in']);
  }

  private onVerifyForgotPasswordFailure(response: ErrorApiResponse): void {
    console.log('Got verify error');
    console.log(response);
    //Wait, and retry? Display error?
    this.formSubmitted = true;
    this.response = response.detail;
  }

  private submitVerifyResetPassword(): void {
    this.authService.verifyForgotPasswordToken(
      this.emailToken,
      this.userUuid,
      this.resetPasswordForm.value.newPassword
    ).subscribe(
      (data) => this.onVerifyForgotPasswordSuccess(data),
      (err) => this.onVerifyForgotPasswordFailure(err)
    );
  }

}
