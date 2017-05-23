import {Component, OnInit, OnDestroy} from '@angular/core';
import {fadeInOut} from "../../animations";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {OrganizationService} from "../../services/api-services/organization.service";
import {WsTitleService} from "../../services/ui-services/ws-title.service";
import {WsBreadcrumbsService} from "../../services/ui-services/ws-breadcrumbs.service";
import {WsViewstateService} from "../../services/ui-services/ws-viewstate.service";
import {Organization} from "../../services/api-services/models/organization.class";
import {WebAppsListViewstate} from "../../services/ui-services/models/viewstates/wep-apps-list.class";
import {QueryOrdering} from "../../services/api-services/models/requests/query-ordering.class";
import {QueryFilter} from "../../services/api-services/models/requests/query-filter.class";
import {ManyApiResponse} from "../../services/api-services/models/responses/many-api-response.interface";
import {WebService} from "../../services/api-services/models/web-service.interface";
import {WebServiceAnalytics} from "../../services/api-services/models/analytics/web-service-analytics.class";
import {PresentationResponse} from "../../services/api-services/models/responses/presentation-response.interface";
import {WsPresentationService} from "../../services/api-services/ws-presentation.service";
import {WebServiceService} from "../../services/api-services/web-service.service";
import {WsDialogService} from "../../components/ws-dialogs/ws-dialog.service";

@Component({
  selector: 'ws-topography-web-apps-list',
  templateUrl: './topography-web-apps-list.component.html',
  styleUrls: ['./topography-web-apps-list.component.sass'],
  host: {
    '[@fadeInOut]': 'true',
    'class': 'page-swap',
  },
  animations: [
    fadeInOut
  ]
})
export class TopographyWebAppsListComponent implements OnInit, OnDestroy {

  private webAppsApiResponse: ManyApiResponse<WebService[]>;
  private webAppsAnalytics: WebServiceAnalytics;
  private subscriptions: Subscription[] = [];
  private _orgUuid: string;
  private _organization: Organization;
  private _queryFilters: QueryFilter[] = [];
  private _searchTerm: string = null;
  private _queryOrdering: QueryOrdering;
  private _currentPage: number = 1;
  private webAppPresentation: PresentationResponse;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orgService: OrganizationService,
    private titleService: WsTitleService,
    private breadcrumbsService: WsBreadcrumbsService,
    private viewstateService: WsViewstateService,
    private webServiceService: WebServiceService,
    private dialogService: WsDialogService,
  ) { }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.titleService.currentTitle = 'Web Applications';
    this.loadViewstate();
    this.subscriptions.push(this.route.params.subscribe(params => this.orgUuid = params['orgId']));
  }

  private addQueryFilter(filter: QueryFilter): void {
    let currentFilters = this.queryFilters.slice(0);
    currentFilters.push(filter);
    this.queryFilters = currentFilters;
  }

  private createQueryFilter(key: string, value: string, label: string): void {
    let newFilter = new QueryFilter(key, value, label);
    let currentFilters = this.queryFilters.slice(0);
    currentFilters.push(newFilter);
    this.queryFilters = currentFilters;
  }

  private fetchAll(): void {
    this.fetchOrganization();
    this.fetchWebAppPresentation();
    this.fetchAllWebApps();
  }

  private fetchAllWebApps(): void {
    this.fetchWebApps();
    this.fetchWebAppsAnalytics();
  }

  private fetchOrganization(): void {
    this.orgService.getOrganization(this.orgUuid)
      .subscribe(
        organization => this.organization = organization,
        error => {
          if (error.status_code == 404) {
            this.router.navigate(['/organizatons/mine']);
          }
        }
      )
  }

  private fetchWebAppPresentation(): void {
    this.webServiceService.getPresentation(this.orgUuid)
      .subscribe(presentation => this.webAppPresentation = presentation);
  }

  private fetchWebApps(): void {
    this.orgService.getWebServicesNew(
      this.orgUuid,
      this.currentPage,
      this.queryFilters,
      this.searchTerm,
      this.queryOrdering,
    ).subscribe(response => {
      console.log('Got web apps');
      console.log(response);
      this.webAppsApiResponse = response;
    });
  }

  private fetchWebAppsAnalytics(): void {
    this.orgService.getWebServiceAnalyticsNew(this.orgUuid, this.queryFilters, this.searchTerm)
      .subscribe(analytics => {
        console.log('Got analytics');
        console.log(analytics);
        this.webAppsAnalytics = analytics;
      });
  }

  private loadViewstate(): void {
    let viewstate = this.viewstateService.getViewstate();
    console.log('Viewstate is ');
    console.log(viewstate);
    if (viewstate) {
      this._queryOrdering = viewstate.queryOrdering;
      this._searchTerm = viewstate.searchTerm;
      this._currentPage = viewstate.page;
      this._queryFilters = viewstate.queryFilters;
    }
  }

  private onAuthenticationHeadersClicked(headersUsed: any): void {
    let title = '';
    if (headersUsed) {
      title = 'Uses WWW Authenticate Headers';
    } else {
      title = 'Does Not Use WWW Authenticate Headers';
    }
    this.createQueryFilter('has_www_authenticate_headers', headersUsed, title);
  }

  private onExportClicked(): void {
    this.dialogService.showExportDataDialog(
      this.orgService.getWebServicesExportUrl(this.orgUuid),
      this.queryFilters,
      this.queryOrdering,
      this.searchTerm,
      this.webAppPresentation.fields,
    );
  }

  private onFilterCreated(filter: QueryFilter): void {
    this.addQueryFilter(filter);
  }

  private onHostnameIsIpClicked(value: any): void {
    let title = '';
    if (value) {
      title = 'Hostname Is IP Address';
    } else {
      title = 'Hostname Is Not IP Address';
    }
    this.createQueryFilter('hostname_is_ip_address', value, title);
  }

  private onPageChanged(page: number): void {
    this.currentPage = page;
    this.fetchWebApps();
  }

  private onPortClicked(port: any): void {
    let title = 'TCP Port ' + port.toString();
    this.createQueryFilter('network_service_port', port, title);
  }

  private onQueryFiltersChanged(queryFilters: QueryFilter[]): void {
    this.queryFilters = queryFilters;
  }

  private onQueryOrderingChanged(ordering: QueryOrdering): void {
    this.queryOrdering = ordering;
  }

  private onSearchTermChanged(term: string): void {
    this.searchTerm = term;
  }

  private onSslSupportClicked(supported: any): void {
    let title = '';
    if (supported) {
      title = 'Accessed Over SSL/TLS';
    } else {
      title = 'Not Accessed Over SSL/TLS';
    }
    this.createQueryFilter('web_service_uses_ssl', supported, title);
  }

  private setViewstate(): void {
    this.viewstateService.setViewstate(this.viewstate);
  }

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(newValue: number) {
    this._currentPage = newValue;
    this.setViewstate();
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
    this.breadcrumbsService.setBreadcrumbsForWebAppsList(newValue);
    this.fetchAll();
  }

  get queryFilters(): QueryFilter[] {
    return this._queryFilters;
  }

  set queryFilters(newValue: QueryFilter[]) {
    this._queryFilters = newValue;
    this.currentPage = 1;
    this.fetchAllWebApps();
  }

  get queryOrdering(): QueryOrdering {
    return this._queryOrdering;
  }

  set queryOrdering(newValue: QueryOrdering) {
    this._queryOrdering = newValue;
    this.setViewstate();
    this.fetchAllWebApps();
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(newValue: string) {
    if (newValue == '') {
      this._searchTerm = null;
    } else {
      this._searchTerm = newValue;
    }
    this.setViewstate();
    this.fetchAllWebApps();
  }

  get viewstate(): WebAppsListViewstate {
    return new WebAppsListViewstate(
      this.currentPage,
      this.queryFilters,
      this.queryOrdering,
      this.searchTerm,
    );
  }

}
