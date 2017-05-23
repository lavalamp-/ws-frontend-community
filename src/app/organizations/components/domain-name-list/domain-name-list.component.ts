import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ManyApiResponse} from "../../../services/api-services/models/responses/many-api-response.interface";
import {DomainName} from "../../../services/api-services/models/domain-name.class";
import {QueryOrdering} from "../../../services/api-services/models/requests/query-ordering.class";
import {QueryFilter} from "../../../services/api-services/models/requests/query-filter.class";

@Component({
  selector: 'ws-domain-name-list',
  templateUrl: './domain-name-list.component.html',
  styleUrls: ['./domain-name-list.component.sass']
})
export class DomainNameListComponent implements OnInit {

  @Input() apiResponse: ManyApiResponse<DomainName[]>;
  @Input() searchTerm: string;
  @Input() queryOrdering: QueryOrdering;
  @Input() listMargin: number = 2;
  @Input() canUserWrite: boolean = false;
  @Output() exportClicked = new EventEmitter;
  @Output() pageChanged = new EventEmitter;
  @Output() searchChanged = new EventEmitter;
  @Output() filterCreated = new EventEmitter;
  @Output() orderingChanged = new EventEmitter;
  @Output() domainIncludeToggled = new EventEmitter;
  @Output() deleteDomainClicked = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  private onDeleteDomainClicked(networkUuid: string): void {
    this.deleteDomainClicked.emit(networkUuid);
  }

  private onExportClicked(): void {
    this.exportClicked.emit(null);
  }

  private onFilterCreated(filter: QueryFilter): void {
    this.filterCreated.emit(filter);
  }

  private onDomainIncludeToggled(toggled: any[]): void {
    this.domainIncludeToggled.emit(toggled);
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
