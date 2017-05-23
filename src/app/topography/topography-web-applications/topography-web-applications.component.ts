import {Component, OnInit, OnDestroy} from '@angular/core';
import {fadeInOut} from "../../animations";
import {OrganizationService} from "../../services/api-services/organization.service";
import {WsViewstateService} from "../../services/ui-services/ws-viewstate.service";
import {WebService} from "../../services/api-services/models/web-service.interface";
import {DataTableConfiguration} from "../../components/ws-tables/models/data-table-configuration.class";
import {WsTableService} from "../../components/ws-tables/ws-table.service";
import {WebServiceService} from "../../services/api-services/web-service.service";
import {Router, ActivatedRoute} from "@angular/router";
import {ManyApiResponse} from "../../services/api-services/models/responses/many-api-response.interface";
import {Logger} from "angular2-logger/core";
import {QueryOrdering} from "../../services/api-services/models/requests/query-ordering.class";
import {HttpTransactionAnalytics} from "../../services/api-services/models/analytics/http-transaction-analytics.interface";
import {WsChartService} from "../../components/ws-charts/ws-chart.service";
import {PieDataset} from "../../components/ws-charts/models/pie-dataset.class";
import {HistogramDataset} from "../../components/ws-charts/models/histogram-dataset.class";
import {HttpScreenshot} from "../../services/api-services/models/es/http-screenshot.interface";
import {WebTechReport} from "../../services/api-services/models/es/web-tech-report.interface";
import {QueryFilter} from "../../services/api-services/models/requests/query-filter.class";
import {WsTitleService} from "../../services/ui-services/ws-title.service";
import {WsBreadcrumbsService} from "../../services/ui-services/ws-breadcrumbs.service";
import {WebServiceAnalytics} from "../../services/api-services/models/analytics/web-service-analytics.class";
import {Subscription} from "rxjs";
import {Organization} from "../../services/api-services/models/organization.class";

@Component({
  selector: 'ws-topography-web-applications',
  templateUrl: './topography-web-applications.component.html',
  styleUrls: ['./topography-web-applications.component.css'],
  host: {
    '[@fadeInOut]': 'true',
    'class': 'page-swap'
  },
  animations: [
    fadeInOut
  ],
})
export class TopographyWebApplicationsComponent implements OnInit, OnDestroy {

  private webServicesApiResponse: ManyApiResponse<any>;
  private webScreenshotsApiResponse: ManyApiResponse<any>;
  private _webScreenshots: HttpScreenshot[];
  private _webServices: WebService[];
  private _webServicesOrder: QueryOrdering;
  private _webTechReport: WebTechReport;
  private _webTransactionAnalytics: HttpTransactionAnalytics;
  private _contentTypePieDataset: PieDataset;
  private _statusCodePieDataset: PieDataset;
  private _contentSizeHistogramDataset: HistogramDataset;
  private chartQueryFiltersMap: any;
  private techPanelQueryFilters: QueryFilter[];
  private webServiceAnalytics: WebServiceAnalytics;
  protected webServicesTableConfiguration: DataTableConfiguration;
  private subscriptions: Subscription[] = [];
  private _orgUuid: string;
  private _organization: Organization;

  constructor(
    private orgService: OrganizationService,
    private viewstateService: WsViewstateService,
    private tableService: WsTableService,
    private webserviceService: WebServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private logger: Logger,
    private chartService: WsChartService,
    private titleService: WsTitleService,
    private breadcrumbsService: WsBreadcrumbsService,
  ) { }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.techPanelQueryFilters = [];
    this.chartQueryFiltersMap = {};
    this.titleService.currentTitle = 'Web Applications';
    this.subscriptions.push(this.route.params.subscribe(params => this.orgUuid = params['orgId']));
  }

  private addChartQueryFilter(key: string, value: any, label: string): void {
    let newFilter = new QueryFilter(key, value, label);
    if (!(newFilter.hash in this.chartQueryFiltersMap)) {
      this.chartQueryFiltersMap[newFilter.hash] = newFilter;
      this.fetchAll();
    }
  }

  private fetchAll(): void {
    this.fetchOrganization();
    this.fetchWebServices();
    this.fetchScreenshots();
    this.fetchWebServiceAnalytics();
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

  private fetchScreenshots(pageNumber = 1): void {
    this.orgService.getWebServiceScreenshots(
      this.orgUuid,
      pageNumber,
      this.allQueryFilters
    ).subscribe(response => {
      this.webScreenshotsApiResponse = response;
      this.webScreenshots = response.results;
    });
  }

  private fetchTransactionAnalytics(): void {
    this.orgService.getWebTransactionAnalytics(this.orgUuid, this.allQueryFilters)
      .subscribe(analytics => this.webTransactionAnalytics = analytics);
  }

  private fetchWebTechReport(): void {
    this.orgService.getWebTechReportAnalytics(this.orgUuid, this.allQueryFilters)
      .subscribe(techReport => this.webTechReport = techReport);
  }

  private fetchWebServices(pageNumber = 1): void {
    let orderField = null;
    let orderDirection = null;
    if (this._webServicesOrder) {
      orderField = this._webServicesOrder.orderField;
      orderDirection = this._webServicesOrder.orderDirection;
    }
    this.orgService.getWebServices(
      this.orgUuid,
      pageNumber,
      this.allQueryFilters,
      orderField,
      orderDirection,
    ).subscribe(manyApiResponse => {
      this.webServicesApiResponse = manyApiResponse;
      this.webServices = manyApiResponse.results;
    });
  }

  private fetchWebServiceAnalytics(): void {
    this.orgService.getWebServiceAnalytics(this.orgUuid, this.allQueryFilters)
      .subscribe(analytics => {
        console.log('Got analytics');
        console.log(analytics);
        this.webServiceAnalytics = analytics;
      });
  }

  private onChartFilterBadgeClicked(queryFilter: QueryFilter): void {
    delete this.chartQueryFiltersMap[queryFilter.hash];
    this.fetchAll();
  }

  private onNetworkClicked(network: string): void {
    this.addChartQueryFilter('network_cidr_range', network, network);
  }

  private onPanelFilterBadgeClicked(index: number): void {
    this.techPanelQueryFilters.splice(index, 1);
    this.fetchAll();
  }

  private onPortClicked(port: number): void {
    this.addChartQueryFilter('network_service_port', port, 'Port ' + port.toString());
  }

  private onScreenshotPageChanged(pageNumber: number): void {
    this.fetchScreenshots(pageNumber);
  }

  private onServicesPageClicked(pageNumber: number): void {
    this.fetchWebServices(pageNumber);
  }

  private onServicesSortChanged(queryOrdering: QueryOrdering): void {
    this.webServicesOrder = queryOrdering;
  }

  private onSslSupportClicked(enabled: boolean): void {
    this.addChartQueryFilter('web_service_uses_ssl', enabled, 'Uses SSL');
  }

  private onTechPanelFiltersChanged(queryFilters: QueryFilter[]): void {
    this.techPanelQueryFilters = queryFilters;
    this.fetchAll();
  }

  private onViewWebAppClicked(uuid: string): void {
    this.router.navigate(['../web-application/' + uuid], { relativeTo: this.route });
  }

  get allQueryFilters(): QueryFilter[] {
    let toReturn = [];
    toReturn = toReturn.concat(this.techPanelQueryFilters);
    toReturn = toReturn.concat(this.chartQueryFilters);
    return toReturn;
  }

  get chartQueryFilters(): QueryFilter[] {
    let toReturn = [];
    for (let key of Object.keys(this.chartQueryFiltersMap)) {
      toReturn.push(this.chartQueryFiltersMap[key]);
    }
    return toReturn;
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
    this.breadcrumbsService.setBreadcrumbsForWebApplications(newValue);
    this.fetchAll();
  }

  set webScreenshots(newShots: HttpScreenshot[]) {
    this._webScreenshots = newShots;
    console.log('Got new screenshots');
    console.log(this._webScreenshots);
  }

  set webServices(newServices: WebService[]) {
    this._webServices = newServices;
    this.webServicesTableConfiguration = this.tableService.buildTableFromArray(
      this._webServices,
      [
        'hostname',
        'sslEnabled',
        'ip_address',
        'port',
      ]
    );
  }

  set webServicesOrder(newOrder: QueryOrdering) {
    this._webServicesOrder = newOrder;
    this.fetchWebServices();
  }

  get webTechReport(): WebTechReport {
    return this._webTechReport;
  }

  set webTechReport(newReport: WebTechReport) {
    this._webTechReport = newReport;
    console.log('Got tech report');
    console.log(this._webTechReport);
  }

  set webTransactionAnalytics(newValue: HttpTransactionAnalytics) {
    this._webTransactionAnalytics = newValue;
    this._contentTypePieDataset = this.chartService.dataPointsToPie(this._webTransactionAnalytics.content_types);
    this._statusCodePieDataset = this.chartService.dataPointsToPie(this._webTransactionAnalytics.response_statuses);
    this._contentSizeHistogramDataset = this.chartService.dataPointsToHistogram(
      this._webTransactionAnalytics.content_lengths,
      'Content Length'
    );
  }

}
