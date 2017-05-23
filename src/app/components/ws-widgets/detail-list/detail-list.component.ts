import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DetailItem} from "../models/detail-item.interface";
import {QueryFilter} from "../../../services/api-services/models/requests/query-filter.class";

@Component({
  selector: 'ws-detail-list',
  templateUrl: './detail-list.component.html',
  styleUrls: ['./detail-list.component.sass']
})
export class DetailListComponent implements OnInit {

  @Input() detailItems: DetailItem[] = [];
  @Input() horizontal: boolean = true;
  @Input() showFilters: boolean = true;
  @Input() wordBreak: string = 'normal';
  @Output() filterCreated = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  private isInt(toCheck: any): boolean {
    return !isNaN(Number(toCheck));
  }

  private onFilterClicked(filterKey: any, filterDescription: any, filterLabel: any, filterValue: any): void {
    let filter;
    if (filterValue != null) {
      filter = new QueryFilter(filterKey, filterValue, filterLabel);
    } else {
      filter = new QueryFilter(filterKey, filterDescription, filterLabel);
    }
    this.filterCreated.emit(filter);
  }

}
