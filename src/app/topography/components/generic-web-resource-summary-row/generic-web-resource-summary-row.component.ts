import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {GenericWebResource} from "../../../services/api-services/models/generic-web-resource.class";
import {DetailItem} from "../../../components/ws-widgets/models/detail-item.interface";
import {DetailListService} from "../../../components/ws-widgets/detail-list.service";
import {QueryFilter} from "../../../services/api-services/models/requests/query-filter.class";

@Component({
  selector: 'ws-generic-web-resource-summary-row',
  templateUrl: './generic-web-resource-summary-row.component.html',
  styleUrls: ['./generic-web-resource-summary-row.component.sass']
})
export class GenericWebResourceSummaryRowComponent implements OnInit, OnChanges {

  @Input() resource: GenericWebResource;
  @Input() showDetailsButton: boolean = true;
  @Input() titlePrelude: string;
  @Output() filterCreated = new EventEmitter;
  public summaryDetails: DetailItem[];

  constructor(
    private detailListService: DetailListService,
  ) { }

  ngOnChanges() {
    if (this.resource) {
      this.summaryDetails = this.detailListService.getWebResourceSummaryDetails(this.resource);
    } else {
      this.summaryDetails = [];
    }
  }

  ngOnInit() {
  }

  private onDetailsClicked(): void {

  }

  private onFilterCreated(queryFilter: QueryFilter): void {
    this.filterCreated.emit(queryFilter);
  }

  get titleText(): string {
    if (this.titlePrelude) {
      return this.titlePrelude + ' ' + this.resource.url_path  + ' (' + this.resource.response_status + ')';
    } else {
      return this.resource.url_path  + ' (' + this.resource.response_status + ')';
    }
  }

}
