import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ManyApiResponse} from "../../../services/api-services/models/responses/many-api-response.interface";
import {WebService} from "../../../services/api-services/models/web-service.interface";
import {WebServiceAnalytics} from "../../../services/api-services/models/analytics/web-service-analytics.class";
import {QueryOrdering} from "../../../services/api-services/models/requests/query-ordering.class";
import {QueryFilter} from "../../../services/api-services/models/requests/query-filter.class";

@Component({
  selector: 'ws-web-app-list',
  templateUrl: './web-app-list.component.html',
  styleUrls: ['./web-app-list.component.sass']
})
export class WebAppListComponent implements OnInit {

  @Input() apiResponse: ManyApiResponse<WebService[]>;
  @Input() webAppsAnalytics: WebServiceAnalytics;
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
    this.exportClicked.emit();
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
