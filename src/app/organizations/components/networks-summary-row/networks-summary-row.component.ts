import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Network} from "../../../services/api-services/models/network.class";

@Component({
  selector: 'ws-networks-summary-row',
  templateUrl: './networks-summary-row.component.html',
  styleUrls: ['./networks-summary-row.component.sass']
})
export class NetworksSummaryRowComponent implements OnInit {

  @Input() network: Network;
  @Input() canUserWrite: boolean = false;
  @Output() networkToggled = new EventEmitter;
  @Output() deleteClicked = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  private onDeleteClicked(): void {
    this.deleteClicked.emit(this.network.uuid);
  }

  private onIncludeToggled(): void {
    this.networkToggled.emit([this.network.uuid, !this.network.scanning_enabled]);
  }

}
