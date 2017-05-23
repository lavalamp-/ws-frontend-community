import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {HtmlWebResource} from "../../../services/api-services/models/html-web-resources.class";
import {DetailListService} from "../../../components/ws-widgets/detail-list.service";
import {Router} from "@angular/router";
import {DetailItem} from "../../../components/ws-widgets/models/detail-item.interface";
import {QueryFilter} from "../../../services/api-services/models/requests/query-filter.class";

@Component({
  selector: 'ws-html-web-resource-summary-row',
  templateUrl: './html-web-resource-summary-row.component.html',
  styleUrls: ['./html-web-resource-summary-row.component.sass']
})
export class HtmlWebResourceSummaryRowComponent implements OnInit, OnChanges {

  @Input() resource: HtmlWebResource;
  @Input() showDetailsButton: boolean = true;
  @Input() titlePrelude: string;
  @Output() filterCreated = new EventEmitter;
  public summaryDetails: DetailItem[];
  public htmlDetails: DetailItem[];

  constructor(
    private detailListService: DetailListService,
    private router: Router,
  ) { }

  ngOnChanges() {
    if (this.resource) {
      this.summaryDetails = this.detailListService.getWebResourceSummaryDetails(this.resource);
      this.htmlDetails = this.detailListService.getHtmlDetails(this.resource);
    } else {
      this.summaryDetails = [];
      this.htmlDetails = [];
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
