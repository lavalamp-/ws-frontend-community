import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ApiErrorService} from "../../services/api-services/api-error.service";
import {AuthService} from "../../services/api-services/auth.service";
import {WsTitleService} from "../../services/ui-services/ws-title.service";
import {FormGroup} from "@angular/forms";
import {ErrorApiResponse} from "../../services/api-services/models/responses/error-api-response.interface";
import {Router} from "@angular/router";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'ws-setup-account-page',
  templateUrl: './setup-account-page.component.html',
  styleUrls: ['./setup-account-page.component.css']
})
export class SetupAccountPageComponent implements OnInit {

  private sub: any;
  private emailToken: string;
  private userUuid: string;
  private setupAccountForm: FormGroup;
  private formSubmitted: boolean;
  private success: boolean;
  private response: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private errorService: ApiErrorService,
    private titleService: WsTitleService,
    private router: Router,
    private notifyService: NotificationsService,
  ) { }

  ngOnInit() {
    this.titleService.currentTitle = 'Setup Account';
    this.formSubmitted = false;
    this.success = true;
    this.response = '';

    this.sub = this.route.params.subscribe(params => {
      this.emailToken = params['emailToken']; // (+) converts string 'id' to a number
      this.userUuid = params['userUuid'];
    });
  }

  private onEnterPressed(): void {
    if (this.setupAccountForm.valid) {
      this.onSetupAccountClicked();
    }
  }

  private onSetupAccountClicked(): void {
    this.submitAccountSetup();
  }

  private submitAccountSetup(): void {
    this.authService.setupAccount(
      this.setupAccountForm.value.firstName,
      this.setupAccountForm.value.lastName,
      this.setupAccountForm.value.password,
      this.emailToken,
      this.userUuid
    ).subscribe(
      (data) => this.onSignUpSuccess(data),
      (err) => this.onSignUpFailure(err)
    );
  }

  private onSignUpSuccess(response: Object): void {
    this.notifyService.success('Successfully set up your account!', 'Please go ahead and log in to start using Web Sight.');
    this.router.navigate(['/greeting/log-in']);
  }

  private onSignUpFailure(response: ErrorApiResponse): void {
    this.success = false;
    this.formSubmitted = true;
    this.response = response.detail;
  }

  private onSetupAccountFormChanged(setupAccountForm: FormGroup): void {
    this.setupAccountForm = setupAccountForm;
  }

}
