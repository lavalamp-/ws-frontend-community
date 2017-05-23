import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ManyApiResponse} from "../../../services/api-services/models/responses/many-api-response.interface";
import {QueryFilter} from "../../../services/api-services/models/requests/query-filter.class";
import {QueryOrdering} from "../../../services/api-services/models/requests/query-ordering.class";

@Component({
  selector: 'ws-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.sass']
})
export class TableHeaderComponent implements OnInit {

  @Input() apiResponse: ManyApiResponse<any>;
  @Input() showSearch: boolean = true;
  @Input() showExport: boolean = true;
  @Input() showFilters: boolean = true;
  @Input() showOrdering: boolean = true;
  @Input() analytics: any;
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

  private onFilterCreated(filter: QueryFilter): void {
    this.filterCreated.emit(filter);
  }

  private onExportClicked(): void {
    this.exportClicked.emit(null);
  }

  private onOrderingChanged(ordering: QueryOrdering): void {
    this.orderingChanged.emit(ordering);
  }

  private onPageChanged(page: number): void {
    this.pageChanged.emit(page);
  }

  private onSearchChanged(value: any): void {
    this.searchChanged.emit(value);
  }

  get requiresTwoRows(): boolean {
    return this.rowComponentCount > 4;
  }

  get rowComponentCount(): number {
    let toReturn = 1;
    if (this.showPagination) {
      toReturn++;
    }
    if (this.showFilters) {
      toReturn++;
    }
    if (this.showSearch) {
      toReturn++;
    }
    if (this.showExport) {
      toReturn++;
    }
    if (this.showOrdering) {
      toReturn++;
    }
    return toReturn;
  }

  get showPagination(): boolean {
    if (this.apiResponse) {
      return this.apiResponse.count > this.apiResponse.page_size;
    } else {
      return false;
    }
  }

}
