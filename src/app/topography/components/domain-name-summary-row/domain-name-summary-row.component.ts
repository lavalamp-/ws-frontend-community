import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {DomainNameReport} from "../../../services/api-services/models/domain-name-report.class";
import {DetailListService} from "../../../components/ws-widgets/detail-list.service";
import {Router} from "@angular/router";
import {DetailItem} from "../../../components/ws-widgets/models/detail-item.interface";
import {QueryFilter} from "../../../services/api-services/models/requests/query-filter.class";

@Component({
  selector: 'ws-domain-name-summary-row',
  templateUrl: './domain-name-summary-row.component.html',
  styleUrls: ['./domain-name-summary-row.component.sass']
})
export class DomainNameSummaryRowComponent implements OnInit, OnChanges {

  @Input() domainNameReport: DomainNameReport;
  @Input() showDetailsButton: boolean = false;
  @Input() titlePrelude: string;
  @Output() filterCreated = new EventEmitter;
  public resolutionDetails: DetailItem[];
  public ipDetails: DetailItem[];

  constructor(
    private detailListService: DetailListService,
    private router: Router,
  ) { }

  ngOnChanges() {
    if (this.domainNameReport) {
      this.resolutionDetails = this.detailListService.getDomainResolutionDetails(this.domainNameReport);
      this.ipDetails = this.detailListService.getDomainIpDetails(this.domainNameReport);
    } else {
      this.resolutionDetails = [];
      this.ipDetails = [];
    }
  }

  ngOnInit() {
  }

  public onDetailsClicked(): void {

  }

  public onFilterCreated(queryFilter: QueryFilter): void {
    this.filterCreated.emit(queryFilter);
  }

  get titleText(): string {
    if (this.titlePrelude) {
      return this.titlePrelude + ' ' + this.domainNameReport.domain_name;
    } else {
      return this.domainNameReport.domain_name;
    }
  }

}
