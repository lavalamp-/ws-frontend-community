import {Component, OnInit, Inject, ChangeDetectorRef, ApplicationRef} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {MdDialogRef} from "@angular/material";
import {APP_CONFIG} from "../../../app.config";
import {WsPaymentTokenService} from "../../../services/api-services/ws-payment-token.service";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'ws-payment-method-dialog',
  templateUrl: './payment-method-dialog.component.html',
  styleUrls: ['./payment-method-dialog.component.sass']
})
export class PaymentMethodDialogComponent implements OnInit {

  private ccForm: FormGroup;
  private loading: false;
  private ccError: string;
  private cvcError: string;
  private monthError: string;
  private yearError: string;
  private genericError: string;
  private requestOutstanding: boolean = false;
  private _stripeResponse: any[];

  constructor(
    public dialogRef: MdDialogRef<PaymentMethodDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(APP_CONFIG) private config,
    private changeDetectorRef: ChangeDetectorRef,
    private paymentTokenService: WsPaymentTokenService,
    private notifyService: NotificationsService,
    private appRef: ApplicationRef,
  ) { }

  ngOnInit() {
    this.ccForm = this.formBuilder.group({});
  }

  private createTokenFromResponse(response): void {
    this.paymentTokenService.createPaymentToken(
      this.ccForm.value.paymentName,
      'stripe',
      response['id'],
      null,
      this.ccForm.value.expiryMonth,
      this.ccForm.value.expiryYear,
      this.ccForm.value.cardNumber.substr(this.ccForm.value.cardNumber.length - 4)
    ).subscribe(
      token => {
        this.appRef.tick();
        this.notifyService.success('', 'Your payment method was added successfully.');
        this.appRef.tick();
        this.dialogRef.close(token);
      },
      error => {
        this.requestOutstanding = false;
      }
    );
  }

  private onAddCardClicked(): void {
    console.log(this.ccForm);
    this.submitStripeRequest();
  }

  private resetErrors(): void {
    this.ccError = null;
    this.cvcError = null;
    this.monthError = null;
    this.yearError = null;
    this.genericError = null;
  }

  private submitStripeRequest(): void {
    let stripe = (<any>window).Stripe;
    stripe.setPublishableKey(this.config.stripePublishableKey);
    this.resetErrors();
    this.requestOutstanding = true;
    stripe.createToken({
      number: this.ccForm.value.cardNumber,
      exp_month: this.ccForm.value.expiryMonth,
      exp_year: this.ccForm.value.expiryYear,
      cvc: this.ccForm.value.cvc,
    }, (status: number, response: any) => {
      if (status == 200) {
        this.createTokenFromResponse(response);
      } else {
        let error = response['error'];
        switch(error['param']) {
          case 'number':
            this.ccError = error['message'];
            break;
          case 'exp_month':
            this.monthError = error['message'];
            break;
          case 'exp_year':
            this.yearError = error['message'];
            break;
          case 'cvc':
            this.cvcError = error['message'];
            break;
          default:
            this.genericError = error['message'];
            break;
        }
        this.requestOutstanding = false;
        this.appRef.tick();
      }
    });
  }

}
