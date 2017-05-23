import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ManyApiResponse} from "../../../services/api-services/models/responses/many-api-response.interface";
import {Network} from "../../../services/api-services/models/network.class";
import {QueryOrdering} from "../../../services/api-services/models/requests/query-ordering.class";
import {QueryFilter} from "../../../services/api-services/models/requests/query-filter.class";

@Component({
  selector: 'ws-networks-list',
  templateUrl: './networks-list.component.html',
  styleUrls: ['./networks-list.component.sass']
})
export class NetworksListComponent implements OnInit {

  @Input() apiResponse: ManyApiResponse<Network[]>;
  @Input() searchTerm: string;
  @Input() queryOrdering: QueryOrdering;
  @Input() listMargin: number = 2;
  @Input() canUserWrite: boolean = false;
  @Output() exportClicked = new EventEmitter;
  @Output() pageChanged = new EventEmitter;
  @Output() searchChanged = new EventEmitter;
  @Output() filterCreated = new EventEmitter;
  @Output() orderingChanged = new EventEmitter;
  @Output() networkIncludeToggled = new EventEmitter;
  @Output() deleteNetworkClicked = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  private onDeleteNetworkClicked(networkUuid: string): void {
    this.deleteNetworkClicked.emit(networkUuid);
  }

  private onExportClicked(): void {
    this.exportClicked.emit();
  }

  private onFilterCreated(filter: QueryFilter): void {
    this.filterCreated.emit(filter);
  }

  private onNetworkIncludeToggled(toggled: any[]): void {
    this.networkIncludeToggled.emit(toggled);
  }

  private onOrderingChanged(ordering: QueryOrdering): void {
    this.orderingChanged.emit(ordering);
  }

  private onPageChanged(page: number): void {
    this.pageChanged.emit(page);
  }

  private onSearchChanged(term: string): void {
    this.searchChanged.emit(term);
  }

  get marginString(): string {
    return this.listMargin + 'px';
  }

}
