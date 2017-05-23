import {Component, OnInit, OnDestroy} from '@angular/core';
import {fadeInOut} from "../../animations";
import {Subscription} from "rxjs";
import {WsTitleService} from "../../services/ui-services/ws-title.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Organization} from "../../services/api-services/models/organization.class";
import {OrganizationService} from "../../services/api-services/organization.service";
import {WebService} from "../../services/api-services/models/web-service.interface";
import {WebServiceService} from "../../services/api-services/web-service.service";
import {WsBreadcrumbsService} from "../../services/ui-services/ws-breadcrumbs.service";
import {WebAppDetailsViewstate} from "../../services/ui-services/models/viewstates/web-app-details-viewstate.class";
import {WsViewstateService} from "../../services/ui-services/ws-viewstate.service";
import {QueryFilter} from "../../services/api-services/models/requests/query-filter.class";
import {QueryOrdering} from "../../services/api-services/models/requests/query-ordering.class";
import {ManyApiResponse} from "../../services/api-services/models/responses/many-api-response.interface";
import {WsDialogService} from "../../components/ws-dialogs/ws-dialog.service";
import {PresentationResponse} from "../../services/api-services/models/responses/presentation-response.interface";
import {WebResourceAnalytics} from "../../services/api-services/models/analytics/web-resource-analytics.interface";

@Component({
  selector: 'ws-topography-web-app-details',
  templateUrl: './topography-web-app-details.component.html',
  styleUrls: ['./topography-web-app-details.component.sass'],
  host: {
    '[@fadeInOut]': 'true',
    'class': 'page-swap',
  },
  animations: [
    fadeInOut,
  ]
})
export class TopographyWebAppDetailsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private _orgUuid: string;
  private _organization: Organization;
  private _webAppUuid: string;
  private _webService: WebService;
  private _tabIndex: number = 0;
  private _currentResourcesPage: number = 0;
  private _resourcesQueryFilters: QueryFilter[] = [];
  private _resourcesQueryOrdering: QueryOrdering;
  private _resourcesSearchTerm: string;
  private _resources: ManyApiResponse<any[]>;
  private resourcesIndex: number = 1;
  private resourcesPresentation: PresentationResponse;
  private resourceAnalytics: WebResourceAnalytics;

  constructor(
    private titleService: WsTitleService,
    private route: ActivatedRoute,
    private router: Router,
    private orgService: OrganizationService,
    private webServiceService: WebServiceService,
    private breadcrumbsService: WsBreadcrumbsService,
    private viewstateService: WsViewstateService,
    private dialogService: WsDialogService,
  ) { }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.loadViewstate();
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.webAppUuid = params['webAppId'];
      this.orgUuid = params['orgId'];
    }))
  }

  private addResourcesQueryFilter(filter: QueryFilter): void {
    let currentFilters = this.resourcesQueryFilters.slice(0);
    currentFilters.push(filter);
    this.resourcesQueryFilters = currentFilters;
  }

  private createResourcesQueryFilter(key: string, value: string, label: string): void {
    this.addResourcesQueryFilter(new QueryFilter(key, value, label));
  }

  private fetchAllWebApp(): void {
    this.fetchResources();
    this.fetchWebApp();
    this.fetchResourcesPresentation();
    this.fetchResourceAnalytics();
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

  private fetchResourceAnalytics(): void {
    this.webServiceService.getResourceAnalytics(this.webAppUuid, this.resourcesQueryFilters, this.resourcesSearchTerm)
      .subscribe(analytics => {
        console.log('got analytics');
        console.log(analytics);
        this.resourceAnalytics = analytics;
      });
  }

  private fetchResources(): void {
    this.webServiceService.getResources(
      this.webAppUuid,
      this.currentResourcesPage,
      this.resourcesQueryFilters,
      this.resourcesQueryOrdering,
      this.resourcesSearchTerm,
    )
      .subscribe(resources => this.resources = resources);
  }

  private fetchResourcesPresentation(): void {
    this.webServiceService.getResourcePresentation(this.webAppUuid)
      .subscribe(presentation => this.resourcesPresentation = presentation);
  }

  private fetchWebApp(): void {
    this.webServiceService.getWebService(this.webAppUuid)
      .subscribe(
        webService => this.webService = webService,
        error => {
          if (error.status_code == 404) {
            if (this.orgUuid) {
              this.router.navigate(['/topography/' + this.orgUuid + '/web-apps']);
            } else {
              this.router.navigate(['/organizations/mine']);
            }
          }
        }
      )
  }

  private loadViewstate(): void {
    let viewstate = this.viewstateService.getViewstate();
    if (viewstate) {
      this._tabIndex = viewstate.tabIndex;
    }
  }

  private onQueryFiltersChanged(filters: QueryFilter[]): void {
    if (this.tabIndex == this.resourcesIndex) {
      this.resourcesQueryFilters = filters;
    } else {
      throw 'Not sure how to assign query filters for tab index ' + this.tabIndex + '.';
    }
  }

  private onResourceContentTypeClicked(contentType: string): void {
    this.createResourcesQueryFilter('content_type', contentType, 'Content Type Is ' + contentType);
  }

  private onResourceHasLoginFormClicked(hasLoginForm: string): void {
    this.createResourcesQueryFilter('has_login_form', hasLoginForm, hasLoginForm ? 'Has Login Form' : 'Does Not Have Login Form');
  }

  private onResourceRequestMethodClicked(requestMethod: string): void {
    this.createResourcesQueryFilter('request_method', requestMethod, 'Request Verb Is ' + requestMethod);
  }

  private onResourceStatusClicked(statusCode: string): void {
    this.createResourcesQueryFilter('response_status', statusCode, 'Response Status Code Is ' + statusCode);
  }

  private onResourcesExportClicked(): void {
    this.dialogService.showExportDataDialog(
      this.webServiceService.getResourceUrl(this.webAppUuid),
      this.resourcesQueryFilters,
      this.resourcesQueryOrdering,
      this.resourcesSearchTerm,
      this.resourcesPresentation.fields,
    );
  }

  private onResourcesFilterCreated(filter: QueryFilter): void {
    this.addResourcesQueryFilter(filter);
  }

  private onResourcesOrderingChanged(ordering: QueryOrdering): void {
    this.resourcesQueryOrdering = ordering;
  }

  private onResourcesPageChanged(page: number): void {
    this.currentResourcesPage = page;
    this.fetchResources();
  }

  private onResourcesSearchChanged(searchTerm: string): void {
    this.resourcesSearchTerm = searchTerm;
  }

  private setViewstate(): void {
    this.viewstateService.setViewstate(this.viewstate);
  }

  get currentResourcesPage(): number {
    return this._currentResourcesPage;
  }

  set currentResourcesPage(newValue: number) {
    this._currentResourcesPage = newValue;
    this.setViewstate();
  }

  get organization(): Organization {
    return this._organization;
  }

  set organization(newValue: Organization) {
    this._organization = newValue;
    console.log('Got organization');
    console.log(newValue);
  }

  get orgUuid(): string {
    return this._orgUuid;
  }

  set orgUuid(newValue: string) {
    this._orgUuid = newValue;
    this.fetchOrganization();
  }

  get resources(): ManyApiResponse<any[]> {
    return this._resources;
  }

  set resources(newValue: ManyApiResponse<any[]>) {
    this._resources = newValue;
    console.log('Got resources');
    console.log(newValue);
  }

  get resourcesQueryFilters(): QueryFilter[] {
    return this._resourcesQueryFilters;
  }

  set resourcesQueryFilters(queryFilters: QueryFilter[]) {
    this._resourcesQueryFilters = queryFilters;
    this.setViewstate();
    this.fetchResources();
    this.fetchResourceAnalytics();
  }

  get resourcesQueryOrdering(): QueryOrdering {
    return this._resourcesQueryOrdering;
  }

  set resourcesQueryOrdering(ordering: QueryOrdering) {
    this._resourcesQueryOrdering = ordering;
    this.setViewstate();
    this.fetchResources();
  }

  get resourcesSearchTerm(): string {
    return this._resourcesSearchTerm;
  }

  set resourcesSearchTerm(term: string) {
    this._resourcesSearchTerm = term;
    this.setViewstate();
    this.fetchResources();
    this.fetchResourceAnalytics();
  }

  get tabIndex(): number {
    return this._tabIndex;
  }

  set tabIndex(newValue: number) {
    this._tabIndex = newValue;
    this.setViewstate();
  }

  get viewstate(): WebAppDetailsViewstate {
    return new WebAppDetailsViewstate(
      this.currentResourcesPage,
      this.resourcesQueryFilters,
      this.resourcesQueryOrdering,
      this.resourcesSearchTerm,
      this.tabIndex
    );
  }

  get visibleQueryFilters(): QueryFilter[] {
    if (this.tabIndex == this.resourcesIndex) {
      return this.resourcesQueryFilters;
    } else {
      return [];
    }
  }

  get webAppUuid(): string {
    return this._webAppUuid;
  }

  set webAppUuid(newValue: string) {
    this._webAppUuid = newValue;
    this.fetchAllWebApp();
  }

  get webService(): WebService {
    return this._webService;
  }

  set webService(newValue: WebService) {
    this._webService = newValue;
    this.titleService.currentTitle = 'Web Application At ' + newValue.url;
    this.breadcrumbsService.setBreadcrumbsForWebAppDetails(newValue);
    console.log('got web service');
    console.log(newValue);
  }

}
