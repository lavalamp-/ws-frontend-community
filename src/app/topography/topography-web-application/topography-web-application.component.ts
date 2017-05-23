import {Component, OnInit, OnDestroy} from '@angular/core';
import {fadeInOut} from "../../animations";
import {WebServiceService} from "../../services/api-services/web-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WebService} from "../../services/api-services/models/web-service.interface";
import {HttpTransaction} from "../../services/api-services/models/es/http-transaction.interface";
import {HttpTransactionAnalytics} from "../../services/api-services/models/analytics/http-transaction-analytics.interface";
import {HttpScreenshot} from "../../services/api-services/models/es/http-screenshot.interface";
import {ManyApiResponse} from "../../services/api-services/models/responses/many-api-response.interface";
import {Subscription} from "rxjs";
import {WsTitleService} from "../../services/ui-services/ws-title.service";
import {WsBreadcrumbsService} from "../../services/ui-services/ws-breadcrumbs.service";
import {DetailListService} from "../../components/ws-widgets/detail-list.service";
import {DetailItem} from "../../components/ws-widgets/models/detail-item.interface";
import {Organization} from "../../services/api-services/models/organization.class";
import {OrganizationService} from "../../services/api-services/organization.service";

@Component({
  selector: 'ws-topography-web-application',
  templateUrl: './topography-web-application.component.html',
  styleUrls: ['./topography-web-application.component.css'],
  host: {
    '[@fadeInOut]': 'true',
    'class': 'page-swap'
  },
  animations: [
    fadeInOut
  ]
})
export class TopographyWebApplicationComponent implements OnInit, OnDestroy {

  private screenshotsApiResponse: ManyApiResponse<HttpScreenshot[]>;
  private transactionsApiResponse: ManyApiResponse<HttpTransaction[]>;
  private transactionAnalytics: HttpTransactionAnalytics;
  private webAppDetails: DetailItem[];
  private subscriptions: Subscription[];
  private _webApp: WebService;
  private _webAppUuid: string;
  private _orgUuid: string;
  private _organization: Organization;

  constructor(
    private webserviceService: WebServiceService,
    private route: ActivatedRoute,
    private titleService: WsTitleService,
    private breadcrumbsService: WsBreadcrumbsService,
    private detailListService: DetailListService,
    private router: Router,
    private orgService: OrganizationService,
  ) { }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscriptions = [];
    this.webAppDetails = [];
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.webAppUuid = params['webAppId'];
      this.orgUuid = params['orgId'];
    }));
  }

  private fetchHttpTransactionAnalytics(): void {
    this.webserviceService.getWebServiceTransactionAnalytics(this.webAppUuid)
      .subscribe(analytics => {
        console.log('Got analytics');
        console.log(analytics);
        this.transactionAnalytics = analytics;
      });
  }

  private fetchHttpTransactions(pageNumber: number = 1): void {
    this.webserviceService.getWebServiceTransactions(this.webAppUuid, pageNumber)
      .subscribe(transactions => {
        console.log('Got transactions');
        console.log(transactions);
        this.transactionsApiResponse = transactions;
      })
  }

  private fetchOrganization(): void {
    this.orgService.getOrganization(this.orgUuid)
      .subscribe(
        organization => this.organization = organization,
        error => {
          if (error.status_code == 404) {
            this.router.navigate(['/organizations/mine']);
          }
        }
      )
  }

  private fetchScreenshots(pageNumber: number = 1): void {
    this.webserviceService.getWebServiceScreenshots(this.webAppUuid, pageNumber)
      .subscribe(screenshots => {
        console.log('Got screenshots');
        console.log(screenshots);
        this.screenshotsApiResponse = screenshots;
      })
  }

  private fetchWebApp(): void {
    this.webserviceService.getWebService(this.webAppUuid)
      .subscribe(
        webservice => this.webApp = webservice,
        err => {
          if (err.status_code == 404) {
            this.router.navigate(['/topography/' + this.orgUuid + '/web-applications']);
          }
        }
      );
  }

  private onScreenshotPageChanged(pageNumber: number): void {
    this.fetchScreenshots(pageNumber);
  }

  private onTransactionsPageChanged(pageNumber: number): void {
    this.fetchHttpTransactions(pageNumber);
  }

  private setWebAppUiValues(): void {
    this.titleService.currentTitle = this.webApp.url;
    this.breadcrumbsService.setBreadcrumbsForWebApplication(this.orgUuid, this.webAppUuid, this.webApp.url);
    this.webAppDetails = this.detailListService.getWebServiceDetails(this.webApp);
  }

  get organization(): Organization {
    return this._organization;
  }

  set organization(newValue: Organization) {
    this._organization = newValue;
  }

  get orgUuid(): string {
    return this._orgUuid;
  }

  set orgUuid(newValue: string) {
    this._orgUuid = newValue;
  }

  get webApp(): WebService {
    return this._webApp;
  }

  set webApp(newValue: WebService) {
    this._webApp = newValue;
    this.setWebAppUiValues();
  }

  get webAppUuid(): string {
    return this._webAppUuid;
  }

  set webAppUuid(newValue: string) {
    this._webAppUuid = newValue;
    this.fetchWebApp();
    this.fetchHttpTransactionAnalytics();
    this.fetchHttpTransactions();
    this.fetchScreenshots();
  }

}
