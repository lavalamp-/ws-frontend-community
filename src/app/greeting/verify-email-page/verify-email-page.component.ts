import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ApiErrorService} from "../../services/api-services/api-error.service";
import {AuthService} from "../../services/api-services/auth.service";
import {flyInOut} from "../../animations";
import {WsTitleService} from "../../services/ui-services/ws-title.service";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'ws-verify-email-page',
  templateUrl: './verify-email-page.component.html',
  styleUrls: ['./verify-email-page.component.css'],
})
export class VerifyEmailPageComponent implements OnInit {

  private sub: any;
  private emailToken: string;
  private userUuid: string;
  private emailVerified: boolean;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private errorService: ApiErrorService,
    private titleService: WsTitleService,
    private notifyService: NotificationsService
  ) { }

  ngOnInit() {
    this.titleService.currentTitle = 'Verify Email Address';
    this.emailVerified = false;

    this.sub = this.route.params.subscribe(params => {
      this.emailToken = params['emailToken']; // (+) converts string 'id' to a number
      this.userUuid = params['userUuid'];

      // In a real app: dispatch action to load the details here.
      this.submitEmailVerification();
    });
  }

  submitEmailVerification() {
    this.authService.verifyEmail(
      this.emailToken,
      this.userUuid
    ).subscribe(
      (data) => this.onVerifyEmailSuccess(data),
      (err) => this.onVerifyEmailFailure(err)
    );
  }

  onVerifyEmailSuccess(response: Object) {
    this.notifyService.success('Your email was successfully verified!', 'Please go ahead and log in to start using Web Sight.');
    this.emailVerified = true;
  }

  onVerifyEmailFailure(responseJson: Object) {
    //Wait, and retry? Display error?
  }


}
