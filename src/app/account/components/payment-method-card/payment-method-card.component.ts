import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {PaymentToken} from "../../../services/api-services/models/payment-token.class";

@Component({
  selector: 'ws-payment-method-card',
  templateUrl: './payment-method-card.component.html',
  styleUrls: ['./payment-method-card.component.sass']
})
export class PaymentMethodCardComponent implements OnInit {

  @Input() paymentToken: PaymentToken;
  @Output() deleteClicked = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  private onDeleteClicked(): void {
    this.deleteClicked.emit(this.paymentToken);
  }

}
