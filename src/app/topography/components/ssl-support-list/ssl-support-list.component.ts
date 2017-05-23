import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ManyApiResponse} from "../../../services/api-services/models/responses/many-api-response.interface";
import {SslSupport} from "../../../services/api-services/models/ssl-support.class";
import {SslSupportAnalytics} from "../../../services/api-services/models/analytics/ssl-support-analytics.class";
import {QueryFilter} from "../../../services/api-services/models/requests/query-filter.class";
import {QueryOrdering} from "../../../services/api-services/models/requests/query-ordering.class";

@Component({
  selector: 'ws-ssl-support-list',
  templateUrl: './ssl-support-list.component.html',
  styleUrls: ['./ssl-support-list.component.sass']
})
export class SslSupportListComponent implements OnInit {

  @Input() apiResponse: ManyApiResponse<SslSupport[]>;
  @Input() sslSupportAnalytics: SslSupportAnalytics;
  @Input() searchTerm: string;
  @Input() queryOrdering: QueryOrdering;
  @Output() exportClicked = new EventEmitter;
  @Output() pageChanged = new EventEmitter;
  @Output() searchChanged = new EventEmitter;
  @Output() filterCreated = new EventEmitter;
  @Output() orderingChanged = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  private onExportClicked(): void {
    this.exportClicked.emit(null);
  }

  private onFilterCreated(filter: QueryFilter): void {
    this.filterCreated.emit(filter);
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

}
