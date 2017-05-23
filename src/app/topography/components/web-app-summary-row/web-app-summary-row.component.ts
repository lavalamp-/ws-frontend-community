import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {WebService} from "../../../services/api-services/models/web-service.interface";
import {DetailItem} from "../../../components/ws-widgets/models/detail-item.interface";
import {WsDialogService} from "../../../components/ws-dialogs/ws-dialog.service";
import {WsChipsService} from "../../../services/ui-services/ws-chips.service";
import {WsChip} from "../../../services/ui-services/models/chip.interface";
import {DetailListService} from "../../../components/ws-widgets/detail-list.service";
import {QueryFilter} from "../../../services/api-services/models/requests/query-filter.class";
import {Router} from "@angular/router";

@Component({
  selector: 'ws-web-app-summary-row',
  templateUrl: './web-app-summary-row.component.html',
  styleUrls: ['./web-app-summary-row.component.sass']
})
export class WebAppSummaryRowComponent implements OnInit, OnChanges {

  @Input() webApp: WebService;
  @Input() titlePrelude: string;
  @Input() showDetailsButton: boolean = true;
  @Output() filterCreated = new EventEmitter;
  private chips: WsChip[] = [];
  private imageUrl: string;
  private responseDetails: DetailItem[];
  private sizeDetails: DetailItem[];
  private contentTypeDetails: DetailItem[];
  private endpointDetails: DetailItem[];
  private sslDetails: DetailItem[];
  private summaryDetails: DetailItem[];

  constructor(
    private dialogService: WsDialogService,
    private chipsService: WsChipsService,
    private detailsService: DetailListService,
    private router: Router,
  ) { }

  ngOnChanges() {
    if (this.webApp) {
      if (this.webApp.hasScreenshot) {
        this.imageUrl = this.webApp.screenshot_url;
      } else {
        this.imageUrl = this.placeholderUrl;
      }
      this.chips = this.chipsService.getChipsForWebApp(this.webApp);
      this.chips = this.chipsService.getChipsFromFlags(this.webApp);
      this.responseDetails = this.detailsService.getWebAppResponseDetails(this.webApp);
      this.sizeDetails = this.detailsService.getWebAppSizeDetails(this.webApp);
      this.contentTypeDetails = this.detailsService.getWebAppContentTypeDetails(this.webApp);
      this.endpointDetails = this.detailsService.getWebAppEndpointDetails(this.webApp);
      if (this.webApp.web_service_uses_ssl) {
        this.sslDetails = this.detailsService.getWebAppSslDetails(this.webApp);
      } else {
        this.sslDetails = [];
      }
      this.summaryDetails = this.detailsService.getWebAppSummaryDetails(this.webApp);
    } else {
      this.chips = [];
      this.responseDetails = [];
      this.sizeDetails = [];
      this.contentTypeDetails = [];
      this.endpointDetails = [];
      this.sslDetails = [];
      this.summaryDetails = [];
    }
  }

  ngOnInit() {
  }

  private onDetailsClicked(): void {
    this.router.navigate(['/topography/' + this.webApp.org_uuid + '/web-apps/' + this.webApp.uuid]);
  }

  private onFilterCreated(queryFilter: QueryFilter): void {
    this.filterCreated.emit(queryFilter);
  }

  private onImageClicked(): void {
    if (this.webApp.hasScreenshot) {
      this.dialogService.showLightboxDialog(1024, 768, this.imageUrl);
    }
  }

  private onImageError(): void {
    this.imageUrl = this.placeholderUrl;
  }

  get placeholderUrl(): string {
    return 'https://placeholdit.imgix.net/~text?txtsize=85&txt=No%20Screenshot%20Available&w=1024&h=768';
  }

  get titleText(): string {
    if (this.titlePrelude) {
      return this.titlePrelude + ' ' + this.webApp.url;
    } else {
      return this.webApp.url;
    }
  }

}
