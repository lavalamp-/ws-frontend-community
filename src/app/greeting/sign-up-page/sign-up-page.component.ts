import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {flyInOut} from "../../animations";
import {AuthService} from "../../services/api-services/auth.service";
import {ApiErrorService} from "../../services/api-services/api-error.service";
import {NotificationsService} from "angular2-notifications";
import {Router} from "@angular/router";
import {ReCaptchaComponent} from 'angular2-recaptcha/lib/captcha.component';
import {WsTitleService} from "../../services/ui-services/ws-title.service";
import {ErrorApiResponse} from "../../services/api-services/models/responses/error-api-response.interface";

@Component({
  selector: 'ws-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
  host: {
    '[@flyInOut]' : 'true'
  },
  animations: [
    flyInOut
  ],
  styles: [':host { width: 100%; }']
})
export class SignUpPageComponent implements OnInit {

  private signUpForm: FormGroup;
  private formSubmitted: boolean;
  private success: boolean;
  private response: string;
  private recaptchaValidated: boolean;
  private recaptchaResponse: string;
  @ViewChild(ReCaptchaComponent) captcha:ReCaptchaComponent;

  constructor(
    private authService: AuthService,
    private errorService: ApiErrorService,
    private router: Router,
    private titleService: WsTitleService,
    private notifyService: NotificationsService
  ) { }

  ngOnInit() {
    this.formSubmitted = false;
    this.success = true;
    this.response = '';
    this.recaptchaResponse = '';
    this.recaptchaValidated = false;
    this.titleService.currentTitle = 'Sign Up';
  }

  private onEnterPressed(): void {
    if (this.signUpForm.valid) {
      this.onSignUpClicked();
    }
  }

  private onSignUpClicked(): void {
    if (this.recaptchaValidated) {
      this.submitSignUp();
    } else {
      this.response = 'Re-Captcha is required to login.'
    }
  }

  private submitSignUp(): void {
    this.authService.signUp(
      this.signUpForm.value.firstName,
      this.signUpForm.value.lastName,
      this.signUpForm.value.email,
      this.signUpForm.value.password,
      this.recaptchaResponse
    ).subscribe(
      (data) => this.onSignUpSuccess(data),
      (err) => this.onSignUpFailure(err)
    );
  }

  private onSignUpSuccess(response: Object): void {
    this.notifyService.success('Successfully signed up!', 'You should receive an email to verify your account. Once verified, you can sign in');
    this.router.navigate(['/greeting/log-in']);
  }

  private onSignUpFailure(response: ErrorApiResponse): void {
    this.success = false;
    this.formSubmitted = true;
    this.response = response.detail;
    this.recaptchaValidated = false;
    this.captcha.reset();
  }

  private onSignUpFormChanged(signUpForm: FormGroup): void {
    this.signUpForm = signUpForm;
  }

  private handleCorrectCaptcha(event: string): void {
    this.recaptchaResponse = event;
    this.recaptchaValidated = true;
  }
}
