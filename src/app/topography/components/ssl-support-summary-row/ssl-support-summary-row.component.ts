import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {SslSupport} from "../../../services/api-services/models/ssl-support.class";
import {DetailItem} from "../../../components/ws-widgets/models/detail-item.interface";
import {DetailListService} from "../../../components/ws-widgets/detail-list.service";
import {QueryFilter} from "../../../services/api-services/models/requests/query-filter.class";
import {Router} from "@angular/router";
import {WsChipsService} from "../../../services/ui-services/ws-chips.service";
import {WsChip} from "../../../services/ui-services/models/chip.interface";

@Component({
  selector: 'ws-ssl-support-summary-row',
  templateUrl: './ssl-support-summary-row.component.html',
  styleUrls: ['./ssl-support-summary-row.component.sass']
})
export class SslSupportSummaryRowComponent implements OnInit, OnChanges {

  @Input() sslSupport: SslSupport;
  @Input() showDetailsButton: boolean = true;
  @Input() titlePrelude: string;
  @Output() filterCreated = new EventEmitter;
  private summaryDetails: DetailItem[];
  private certificateDetails: DetailItem[];
  private chips: WsChip[];

  constructor(
    private detailListService: DetailListService,
    private router: Router,
    private chipsService: WsChipsService,
  ) { }

  ngOnChanges() {
    if (this.sslSupport) {
      this.summaryDetails = this.detailListService.getSslSummaryDetails(this.sslSupport);
      this.certificateDetails = this.detailListService.getSslCertificateDetails(this.sslSupport);
      this.chips = this.chipsService.getChipsFromFlags(this.sslSupport);
    } else {
      this.summaryDetails = [];
      this.certificateDetails = [];
      this.chips = [];
    }
  }

  ngOnInit() {
  }

  private onDetailsClicked(): void {
    this.router.navigate(['/topography/' + this.sslSupport.org_uuid + '/ssl-support/' + this.sslSupport.network_service_uuid]);
  }

  private onFilterCreated(queryFilter: QueryFilter): void {
    this.filterCreated.emit(queryFilter);
  }

  get expiredText(): string {
    if (this.sslSupport.cert_expired) {
      return 'Certificate Expired';
    } else {
      return 'Certificate Not Expired';
    }
  }

  get titleText(): string {
    if (this.titlePrelude) {
      return this.titlePrelude + ' ' + this.sslSupport.endpoint;
    } else {
      return this.sslSupport.endpoint;
    }
  }

  get validityText(): string {
    if (this.sslSupport.cert_is_valid) {
      return 'Certificate Valid';
    } else {
      return 'Certificate Not Valid';
    }
  }

  get vulnerableText(): string {
    if (this.sslSupport.is_vulnerable) {
      return 'Vulnerable';
    } else {
      return 'Not Vulnerable';
    }
  }

}
