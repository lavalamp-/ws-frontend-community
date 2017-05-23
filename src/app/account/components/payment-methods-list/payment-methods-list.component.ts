import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ManyApiResponse} from "../../../services/api-services/models/responses/many-api-response.interface";
import {PaymentToken} from "../../../services/api-services/models/payment-token.class";
import {WsDialogService} from "../../../components/ws-dialogs/ws-dialog.service";
import {WsPaymentTokenService} from "../../../services/api-services/ws-payment-token.service";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'ws-payment-methods-list',
  templateUrl: './payment-methods-list.component.html',
  styleUrls: ['./payment-methods-list.component.sass']
})
export class PaymentMethodsListComponent implements OnInit {

  private _paymentsPage: number = 1;
  private _paymentTokens: ManyApiResponse<PaymentToken[]>;
  @Output() paymentsPageChange = new EventEmitter;

  constructor(
    private dialogService: WsDialogService,
    private paymentTokenService: WsPaymentTokenService,
    private notifyService: NotificationsService,
  ) { }

  ngOnInit() {
    this.fetchPaymentTokens();
  }

  private fetchPaymentTokens(): void {
    this.paymentTokenService.getPaymentTokens(this.paymentsPage)
      .subscribe(tokens => this.paymentTokens = tokens);
  }

  private onAddPaymentButtonClicked(): void {
    this.dialogService.showPaymentMethodsDialog()
      .subscribe(response => {
        if (response) {
          this.fetchPaymentTokens();
        }
      })
  }

  private onDeleteTokenClicked(token: PaymentToken): void {
    this.paymentTokenService.deletePaymentToken(token.uuid)
      .subscribe(
        response => {
          this.notifyService.success('', 'Payment method deleted successfully');
          this.fetchPaymentTokens();
        },
        error => {
          console.log('Got error');
          console.log(error);
        }
      )
  }

  private onPageChanged(page: number): void {
    this.paymentsPage = page;
    this.fetchPaymentTokens();
  }

  get paymentTokens(): ManyApiResponse<PaymentToken[]> {
    return this._paymentTokens;
  }

  set paymentTokens(tokens: ManyApiResponse<PaymentToken[]>) {
    this._paymentTokens = tokens;
    console.log('Got tokens');
    console.log(tokens);
  }

  @Input()
  get paymentsPage(): number {
    return this._paymentsPage;
  }

  set paymentsPage(page: number) {
    this._paymentsPage = page;
    this.paymentsPageChange.emit(page);
  }

}
