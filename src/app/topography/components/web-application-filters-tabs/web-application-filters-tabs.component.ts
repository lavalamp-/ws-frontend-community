import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {QueryFilter} from "../../../services/api-services/models/requests/query-filter.class";
import {QueryFilters} from "../../../services/api-services/models/requests/query-filters.class";
import {WebServiceAnalytics} from "../../../services/api-services/models/analytics/web-service-analytics.class";

@Component({
  selector: 'ws-web-application-filters-tabs',
  templateUrl: './web-application-filters-tabs.component.html',
  styleUrls: ['./web-application-filters-tabs.component.sass']
})
export class WebApplicationFiltersTabsComponent implements OnInit {

  private _filters: QueryFilter[];
  private queryFilters: QueryFilters;
  @Input() webServiceAnalytics: WebServiceAnalytics;
  @Output() filtersChange = new EventEmitter;

  private filterList = {
    'servers': [
      {
        label: 'Apache',
        accessor: 'uses_apache',
      },
      {
        label: 'IIS',
        accessor: 'uses_iis',
      },
      {
        label: 'Nginx',
        accessor: 'uses_nginx',
      }
    ],
    'frameworks': [
      {
        label: 'Wordpress',
        accessor: 'uses_wordpress',
      },
      {
        label: 'Tomcat Management Portal',
        accessor: 'uses_tomcat_management_portal',
      }
    ]
  };

  constructor() { }

  ngOnInit() {
    this._filters = [];
    this.queryFilters = new QueryFilters();
  }

  private isSelected(fieldName): boolean {
    return this.queryFilterKeys.indexOf(fieldName) > -1;
  }

  private onBadgeClicked(fieldName: string, label: string): void {
    if (this.isSelected(fieldName)) {
      this.removeFilter(fieldName);
    } else {
      this._filters.push(new QueryFilter(fieldName, true, label));
    }
    this.filtersChange.emit(this._filters);
  }

  private removeFilter(fieldName: string): void {
    let index = this.queryFilterKeys.indexOf(fieldName);
    this._filters.splice(index, 1);
  }

  @Input()
  get filters(): QueryFilter[] {
    return this._filters;
  }

  set filters(newFilters: QueryFilter[]) {
    this._filters = newFilters;
  }

  get queryFilterKeys(): string[] {
    let toReturn = [];
    for (let queryFilter of this._filters) {
      toReturn.push(queryFilter.filterKey);
    }
    return toReturn;
  }

}
