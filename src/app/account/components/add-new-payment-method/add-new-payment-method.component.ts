import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {WsDialogService} from "../../../components/ws-dialogs/ws-dialog.service";

@Component({
  selector: 'ws-add-new-payment-method',
  templateUrl: './add-new-payment-method.component.html',
  styleUrls: ['./add-new-payment-method.component.sass']
})
export class AddNewPaymentMethodComponent implements OnInit {

  @Output() tokenAdded = new EventEmitter;

  constructor(
    private dialogService: WsDialogService,
  ) { }

  ngOnInit() {
  }

  private onAddClicked(): void {
    this.dialogService.showPaymentMethodsDialog()
      .subscribe(paymentToken => {
        if (paymentToken) {
          this.tokenAdded.emit(null);
        }
      })
  }

}
