import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {slideUpDownNoDelay, flyInOut, fadeInOutNoDelay} from "../../../animations";
import {QueryFilter} from "../../../services/api-services/models/requests/query-filter.class";

@Component({
  selector: 'ws-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.sass'],
  host: {
    '[@fadeInOutNoDelay]': 'true',
  },
  animations: [
    fadeInOutNoDelay,
  ]
})
export class FilterPanelComponent implements OnInit {

  @Input() queryFilters: QueryFilter[];
  @Output() queryFiltersChanged = new EventEmitter;

  constructor(
  ) { }

  ngOnInit() {
  }

  private onBadgeClicked(index: number): void {
    this.queryFilters.splice(index, 1);
    this.queryFiltersChanged.emit(this.queryFilters);
  }

  private onBadgeRemoved(index: number): void {
    this.queryFilters.splice(index, 1);
    this.queryFiltersChanged.emit(this.queryFilters);
  }

  private onFilterChanged(index: number, queryFilter: QueryFilter): void {
    this.queryFilters[index] = queryFilter;
    this.queryFiltersChanged.emit(this.queryFilters);
    console.log('Filter changed!');
    console.log(this.queryFilters);
  }

}
