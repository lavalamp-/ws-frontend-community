import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ManyApiResponse} from "../../../services/api-services/models/responses/many-api-response.interface";
import {DomainNameReport} from "../../../services/api-services/models/domain-name-report.class";
import {DomainNameReportAnalytics} from "../../../services/api-services/models/analytics/domain-name-report-analytics.class";
import {QueryOrdering} from "../../../services/api-services/models/requests/query-ordering.class";
import {QueryFilter} from "../../../services/api-services/models/requests/query-filter.class";

@Component({
  selector: 'ws-domain-name-list',
  templateUrl: './domain-name-list.component.html',
  styleUrls: ['./domain-name-list.component.sass']
})
export class DomainNameListComponent implements OnInit {

  @Input() apiResponse: ManyApiResponse<DomainNameReport[]>;
  @Input() domainReportAnalytics: DomainNameReportAnalytics;
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
