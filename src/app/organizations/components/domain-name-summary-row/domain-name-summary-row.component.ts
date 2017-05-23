import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DomainName} from "../../../services/api-services/models/domain-name.class";

@Component({
  selector: 'ws-domain-name-summary-row',
  templateUrl: './domain-name-summary-row.component.html',
  styleUrls: ['./domain-name-summary-row.component.sass']
})
export class DomainNameSummaryRowComponent implements OnInit {

  @Input() domainName: DomainName;
  @Input() canUserWrite: boolean = false;
  @Output() domainToggled = new EventEmitter;
  @Output() deleteClicked = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  private onDeleteClicked(): void {
    this.deleteClicked.emit(this.domainName.uuid);
  }

  private onIncludeToggled(): void {
    this.domainToggled.emit([this.domainName.uuid, !this.domainName.scanning_enabled]);
  }

}
