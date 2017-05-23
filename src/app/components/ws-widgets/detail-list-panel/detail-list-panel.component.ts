import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {DetailItem} from "../models/detail-item.interface";
import {QueryFilter} from "../../../services/api-services/models/requests/query-filter.class";

@Component({
  selector: 'ws-detail-list-panel',
  templateUrl: './detail-list-panel.component.html',
  styleUrls: ['./detail-list-panel.component.sass']
})
export class DetailListPanelComponent implements OnInit {

  @Input() detailItems: DetailItem[] = [];
  @Input() horizontal: boolean = true;
  @Input() title: string = 'Title';
  @Input() showFilters: boolean = true;
  @Input() wordBreak: string = 'break-all';
  @Output() filterCreated = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  private onFilterCreated(queryFilter: QueryFilter): void {
    this.filterCreated.emit(queryFilter);
  }

}
