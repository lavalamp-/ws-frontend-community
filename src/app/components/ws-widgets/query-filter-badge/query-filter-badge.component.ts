import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {QueryFilter} from "../../../services/api-services/models/requests/query-filter.class";

@Component({
  selector: 'ws-query-filter-badge',
  templateUrl: './query-filter-badge.component.html',
  styleUrls: ['./query-filter-badge.component.sass']
})
export class QueryFilterBadgeComponent implements OnInit {

  @Input() queryFilter: QueryFilter;
  @Output() filterChanged = new EventEmitter;
  @Output() removeClicked = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  private onIncludeClicked(): void {
    this.queryFilter.toggleInclusion();
    this.filterChanged.emit(this.queryFilter);
  }

  private onRemoveClicked(): void {
    this.removeClicked.emit(null);
  }

  get inclusionText(): string {
    return this.queryFilter.included ? 'Included' : 'Excluded';
  }

}
