import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthService} from "../../services/api-services/auth.service";
import {flyInOut} from "../../animations";
import {Router} from "@angular/router";
import {ApiErrorService} from "../../services/api-services/api-error.service";
import {WsTitleService} from "../../services/ui-services/ws-title.service";

@Component({
  selector: 'ws-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.css'],
  host: {
    '[@flyInOut]' : 'true'
  },
  animations: [
    flyInOut
  ],
  styles: [
    ':host { width: 100%; }'
  ]
})
export class ForgotPasswordPageComponent implements OnInit {

  private forgotPasswordForm: FormGroup;
  private formSubmitted: boolean;
  private success: boolean;
  private response: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private errorService: ApiErrorService,
    private titleService: WsTitleService,
  ) { }

  ngOnInit() {
    this.formSubmitted = false;
    this.success = true;
    this.response = '';
    this.titleService.currentTitle = 'Forgot Password';
  }

  onForgotPasswordClicked() {
    this.authService.forgotPassword(
      this.forgotPasswordForm.value.email
    ).subscribe(
      (data) => this.onForgotPasswordSuccess(data),
      (err) => this.onForgotPasswordFailure(err)
    );
  }

  private onEnterPressed(): void {
    if (this.forgotPasswordForm.valid) {
      this.onForgotPasswordClicked();
    }
  }

  onForgotPasswordFormChanged(forgotPasswordForm: FormGroup) {
    this.forgotPasswordForm = forgotPasswordForm;
  }

  onForgotPasswordSuccess(response: Object) {
    this.router.navigate(['/greeting/forgot-password-sent']);

  }

  onForgotPasswordFailure(response: Object) {
    this.success = false;
    this.formSubmitted = true;
    this.response = this.errorService.getFirstError(response).error_message;
  }

}
